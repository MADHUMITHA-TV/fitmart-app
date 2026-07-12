package com.fitmart.backend.util;

import com.fitmart.backend.dto.response.ReviewResponse;
import com.fitmart.backend.entity.Review;

public final class ReviewMapper {

    private ReviewMapper() {
    }

    public static ReviewResponse toResponse(
            Review review) {

        return ReviewResponse.builder()
                .id(review.getId())
                .userId(review.getUser().getId())
                .userName(
                        review.getUser().getFirstName()
                                + " "
                                + review.getUser().getLastName()
                )
                .productId(review.getProduct().getId())
                .productName(review.getProduct().getName())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }

}