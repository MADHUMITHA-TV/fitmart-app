package com.fitmart.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {

    private Long totalUsers;

    private Long totalProducts;

    private Long totalCategories;

    private Long totalOrders;

    private Long pendingOrders;

    private Long deliveredOrders;

    private BigDecimal totalRevenue;

    private BigDecimal todayRevenue;

    private List<OrderResponse> recentOrders;

    private List<UserResponse> latestUsers;

}