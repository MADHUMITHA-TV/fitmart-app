package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.response.*;
import com.fitmart.backend.enums.OrderStatus;
import com.fitmart.backend.repository.*;
import com.fitmart.backend.service.DashboardService;
import com.fitmart.backend.util.OrderMapper;
import com.fitmart.backend.util.UserMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fitmart.backend.util.OrderMapper;
import com.fitmart.backend.util.UserMapper;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final OrderRepository orderRepository;

    private final ReviewRepository reviewRepository;

    @Override
    public DashboardResponse getDashboard() {

        BigDecimal totalRevenue =
                orderRepository.getTotalRevenue();

        BigDecimal todayRevenue =
                orderRepository.getRevenueAfter(
                        LocalDateTime.now().toLocalDate().atStartOfDay());

        BigDecimal monthlyRevenue =
                orderRepository.getRevenueAfter(
                        LocalDateTime.now()
                                .withDayOfMonth(1)
                                .toLocalDate()
                                .atStartOfDay());

        Double averageRating =
                reviewRepository.getAverageRating();

        return DashboardResponse.builder()

                // Users
                .totalUsers(userRepository.count())

                // Products
                .totalProducts(productRepository.count())
                .totalCategories(categoryRepository.count())

                // Orders
                .totalOrders(orderRepository.count())
                .pendingOrders(orderRepository.countByStatus(OrderStatus.PENDING))
                .processingOrders(orderRepository.countByStatus(OrderStatus.PROCESSING))
                .shippedOrders(orderRepository.countByStatus(OrderStatus.SHIPPED))
                .deliveredOrders(orderRepository.countByStatus(OrderStatus.DELIVERED))
                .cancelledOrders(orderRepository.countByStatus(OrderStatus.CANCELLED))

                // Revenue
                .totalRevenue(totalRevenue)
                .todayRevenue(todayRevenue)
                .monthlyRevenue(monthlyRevenue)

                // Inventory
                .outOfStockProducts(
                        productRepository.countByStockQuantity(0))

                .lowStockProducts(
                        productRepository.countByStockQuantityLessThan(10))

                // Reviews
                .averageRating(
        averageRating == null ? 0.0 : averageRating)

.recentOrders(
        orderRepository
                .findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(OrderMapper::toResponse)
                .toList()
)

.latestUsers(
        userRepository
                .findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(UserMapper::toResponse)
                .toList()
)

.build();

    }

    @Override
    public RevenueResponse getRevenue() {

        return RevenueResponse.builder()

                .totalRevenue(
                        orderRepository.getTotalRevenue())

                .todayRevenue(
                        orderRepository.getRevenueAfter(
                                LocalDateTime.now()
                                        .toLocalDate()
                                        .atStartOfDay()))

                .monthlyRevenue(
                        orderRepository.getRevenueAfter(
                                LocalDateTime.now()
                                        .withDayOfMonth(1)
                                        .toLocalDate()
                                        .atStartOfDay()))

                .build();

    }

    @Override
    public OrderAnalyticsResponse getOrderAnalytics() {

        return OrderAnalyticsResponse.builder()

                .totalOrders(orderRepository.count())

                .pendingOrders(
                        orderRepository.countByStatus(OrderStatus.PENDING))

                .processingOrders(
                        orderRepository.countByStatus(OrderStatus.PROCESSING))

                .shippedOrders(
                        orderRepository.countByStatus(OrderStatus.SHIPPED))

                .deliveredOrders(
                        orderRepository.countByStatus(OrderStatus.DELIVERED))

                .cancelledOrders(
                        orderRepository.countByStatus(OrderStatus.CANCELLED))

                .build();

    }

    @Override
    public ProductAnalyticsResponse getProductAnalytics() {

        return ProductAnalyticsResponse.builder()

                .totalProducts(productRepository.count())

                .totalCategories(categoryRepository.count())

                .outOfStockProducts(
                        productRepository.countByStockQuantity(0))

                .lowStockProducts(
                        productRepository.countByStockQuantityLessThan(10))

                .build();

    }

    @Override
    public UserAnalyticsResponse getUserAnalytics() {

        return UserAnalyticsResponse.builder()

                .totalUsers(userRepository.count())

                .build();

    }

    @Override
    public InventoryAnalyticsResponse getInventoryAnalytics() {

        return InventoryAnalyticsResponse.builder()

                .outOfStockProducts(
                        productRepository.countByStockQuantity(0))

                .lowStockProducts(
                        productRepository.countByStockQuantityLessThan(10))

                .build();

    }

}