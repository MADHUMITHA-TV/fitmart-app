package com.fitmart.backend.service;

import com.fitmart.backend.dto.request.ReviewRequest;
import com.fitmart.backend.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {

    ReviewResponse addReview(
            String email,
            ReviewRequest request
    );

    ReviewResponse updateReview(
            String email,
            Long reviewId,
            ReviewRequest request
    );

    void deleteReview(
            String email,
            Long reviewId
    );

    List<ReviewResponse> getMyReviews(
            String email
    );

    List<ReviewResponse> getProductReviews(
            Long productId
    );

    Double getAverageRating(
            Long productId
    );

}