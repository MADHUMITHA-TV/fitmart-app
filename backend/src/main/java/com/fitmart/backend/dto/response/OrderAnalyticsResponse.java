package com.fitmart.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderAnalyticsResponse {

    private Long totalOrders;

    private Long pendingOrders;

    private Long processingOrders;

    private Long shippedOrders;

    private Long deliveredOrders;

    private Long cancelledOrders;

}