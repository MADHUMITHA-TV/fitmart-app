package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.request.ReviewRequest;
import com.fitmart.backend.dto.response.ReviewResponse;
import com.fitmart.backend.entity.Product;
import com.fitmart.backend.entity.Review;
import com.fitmart.backend.entity.User;
import com.fitmart.backend.exception.BadRequestException;
import com.fitmart.backend.exception.ResourceNotFoundException;
import com.fitmart.backend.repository.ProductRepository;
import com.fitmart.backend.repository.ReviewRepository;
import com.fitmart.backend.repository.UserRepository;
import com.fitmart.backend.service.ReviewService;
import com.fitmart.backend.util.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    @Override
    public ReviewResponse addReview(
            String email,
            ReviewRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        if (reviewRepository.findByUserAndProduct(user, product).isPresent()) {
            throw new BadRequestException(
                    "You have already reviewed this product");
        }

        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        return ReviewMapper.toResponse(
                reviewRepository.save(review));
    }

    @Override
    public ReviewResponse updateReview(
            String email,
            Long reviewId,
            ReviewRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review not found"));

        if (!review.getUser().getId().equals(user.getId())) {
            throw new BadRequestException(
                    "You can update only your own review");
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        return ReviewMapper.toResponse(
                reviewRepository.save(review));
    }

    @Override
    public void deleteReview(
            String email,
            Long reviewId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review not found"));

        if (!review.getUser().getId().equals(user.getId())) {
            throw new BadRequestException(
                    "You can delete only your own review");
        }

        reviewRepository.delete(review);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getMyReviews(
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return reviewRepository.findByUser(user)
                .stream()
                .map(ReviewMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getProductReviews(
            Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        return reviewRepository.findByProduct(product)
                .stream()
                .map(ReviewMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Double getAverageRating(
            Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        List<Review> reviews =
                reviewRepository.findByProduct(product);

        if (reviews.isEmpty()) {
            return 0.0;
        }

        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }

}