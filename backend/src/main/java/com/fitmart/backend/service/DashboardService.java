package com.fitmart.backend.service;

import com.fitmart.backend.dto.response.*;

public interface DashboardService {

    DashboardResponse getDashboard();

    RevenueResponse getRevenue();

    OrderAnalyticsResponse getOrderAnalytics();

    ProductAnalyticsResponse getProductAnalytics();

    UserAnalyticsResponse getUserAnalytics();

    InventoryAnalyticsResponse getInventoryAnalytics();

}