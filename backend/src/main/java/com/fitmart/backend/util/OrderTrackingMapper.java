package com.fitmart.backend.util;

import com.fitmart.backend.dto.response.OrderTrackingResponse;
import com.fitmart.backend.entity.OrderTracking;

public class OrderTrackingMapper {

    private OrderTrackingMapper() {
    }

    public static OrderTrackingResponse toResponse(OrderTracking tracking) {

        return OrderTrackingResponse.builder()
                .id(tracking.getId())
                .orderId(tracking.getOrder().getId())
                .status(tracking.getStatus())
                .remarks(tracking.getRemarks())
                .updatedAt(tracking.getUpdatedAt())
                .build();

    }

}