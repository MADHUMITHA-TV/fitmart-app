package com.fitmart.backend.service;

import com.fitmart.backend.dto.response.OrderResponse;
import com.fitmart.backend.dto.response.UserResponse;
import com.fitmart.backend.enums.OrderStatus;

import java.util.List;

public interface AdminService {

    List<OrderResponse> getAllOrders();

    OrderResponse getOrder(Long id);

    OrderResponse updateOrderStatus(Long id, OrderStatus status);

    void deleteOrder(Long id);

    List<UserResponse> getAllUsers();

UserResponse getUser(Long id);

void deleteUser(Long id);

}