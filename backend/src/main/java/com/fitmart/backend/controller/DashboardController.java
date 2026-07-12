package com.fitmart.backend.controller;

import com.fitmart.backend.dto.response.*;
import com.fitmart.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ApiResponse<DashboardResponse> dashboard() {

        return ApiResponse.success(
                dashboardService.getDashboard());

    }

    @GetMapping("/revenue")
    public ApiResponse<RevenueResponse> revenue() {

        return ApiResponse.success(
                dashboardService.getRevenue());

    }

    @GetMapping("/orders")
    public ApiResponse<OrderAnalyticsResponse> orders() {

        return ApiResponse.success(
                dashboardService.getOrderAnalytics());

    }

    @GetMapping("/products")
    public ApiResponse<ProductAnalyticsResponse> products() {

        return ApiResponse.success(
                dashboardService.getProductAnalytics());

    }

    @GetMapping("/users")
    public ApiResponse<UserAnalyticsResponse> users() {

        return ApiResponse.success(
                dashboardService.getUserAnalytics());

    }

    @GetMapping("/inventory")
    public ApiResponse<InventoryAnalyticsResponse> inventory() {

        return ApiResponse.success(
                dashboardService.getInventoryAnalytics());

    }

}