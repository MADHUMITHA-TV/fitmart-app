package com.fitmart.backend.util;

import com.fitmart.backend.dto.response.OrderItemResponse;
import com.fitmart.backend.dto.response.OrderResponse;
import com.fitmart.backend.entity.Order;
import com.fitmart.backend.entity.OrderItem;

import java.util.List;

public final class OrderMapper {

    private OrderMapper() {
    }

    public static OrderItemResponse toItemResponse(OrderItem item) {

        return OrderItemResponse.builder()
                .orderItemId(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .imageUrl(item.getProduct().getImageUrl())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .totalPrice(item.getTotalPrice())
                .build();
    }

    public static OrderResponse toResponse(Order order) {

        List<OrderItemResponse> items = order.getOrderItems()
                .stream()
                .map(OrderMapper::toItemResponse)
                .toList();

        return OrderResponse.builder()
                .orderId(order.getId())
                .customerName(
                        order.getUser().getFirstName() + " " +
                        order.getUser().getLastName())
                .customerEmail(order.getUser().getEmail())
                .items(items)
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .orderedAt(order.getCreatedAt())
                .build();
    }

}