package com.fitmart.backend.service;

import com.fitmart.backend.dto.request.PlaceOrderRequest;
import com.fitmart.backend.dto.response.OrderResponse;
import com.fitmart.backend.enums.OrderStatus;

import java.util.List;

public interface OrderService {

    OrderResponse placeOrder(
            String email,
            PlaceOrderRequest request);

    List<OrderResponse> getMyOrders(String email);

    OrderResponse getOrderById(
            String email,
            Long orderId);

    OrderResponse updateStatus(
            Long orderId,
            OrderStatus status);

    void deleteOrder(Long orderId);

}