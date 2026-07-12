package com.fitmart.backend.controller;

import com.fitmart.backend.dto.request.ReviewRequest;
import com.fitmart.backend.dto.response.ApiResponse;
import com.fitmart.backend.dto.response.ReviewResponse;
import com.fitmart.backend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ApiResponse<ReviewResponse> addReview(
            Authentication authentication,
            @Valid @RequestBody ReviewRequest request) {

        return ApiResponse.success(
                "Review added successfully",
                reviewService.addReview(
                        authentication.getName(),
                        request
                )
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<ReviewResponse> updateReview(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequest request) {

        return ApiResponse.success(
                "Review updated successfully",
                reviewService.updateReview(
                        authentication.getName(),
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteReview(
            Authentication authentication,
            @PathVariable Long id) {

        reviewService.deleteReview(
                authentication.getName(),
                id
        );

        return ApiResponse.success(
                "Success",
                "Review deleted successfully"
        );
    }

    @GetMapping("/my")
    public ApiResponse<List<ReviewResponse>> myReviews(
            Authentication authentication) {

        return ApiResponse.success(
                reviewService.getMyReviews(
                        authentication.getName()
                )
        );
    }

    @GetMapping("/product/{productId}")
    public ApiResponse<List<ReviewResponse>> productReviews(
            @PathVariable Long productId) {

        return ApiResponse.success(
                reviewService.getProductReviews(productId)
        );
    }

    @GetMapping("/product/{productId}/average")
    public ApiResponse<Double> averageRating(
            @PathVariable Long productId) {

        return ApiResponse.success(
                reviewService.getAverageRating(productId)
        );
    }

}