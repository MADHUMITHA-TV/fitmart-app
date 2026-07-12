package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.response.OrderResponse;
import com.fitmart.backend.dto.response.UserResponse;
import com.fitmart.backend.entity.Order;
import com.fitmart.backend.enums.OrderStatus;
import com.fitmart.backend.repository.OrderRepository;
import com.fitmart.backend.repository.UserRepository;
import com.fitmart.backend.service.AdminService;
import com.fitmart.backend.service.OrderService;
import com.fitmart.backend.util.OrderMapper;
import com.fitmart.backend.util.UserMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final OrderRepository orderRepository;

    private final OrderService orderService;

    private final UserRepository userRepository;

    @Override
    public List<OrderResponse> getAllOrders() {

        return orderRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(OrderMapper::toResponse)
                .toList();
    }

    @Override
    public OrderResponse getOrder(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Order not found"));

        return OrderMapper.toResponse(order);
    }

    @Override
public OrderResponse updateOrderStatus(Long id, OrderStatus status) {
    return orderService.updateStatus(id, status);
}

    @Override
    public void deleteOrder(Long id) {

        if (!orderRepository.existsById(id)) {

            throw new EntityNotFoundException("Order not found");
        }

        orderRepository.deleteById(id);
    }

    @Override
public List<UserResponse> getAllUsers() {

    return userRepository.findAll()
            .stream()
            .map(UserMapper::toResponse)
            .toList();
}

@Override
public UserResponse getUser(Long id) {

    return userRepository.findById(id)
            .map(UserMapper::toResponse)
            .orElseThrow(() ->
                    new EntityNotFoundException("User not found"));
}

@Override
public void deleteUser(Long id) {

    if (!userRepository.existsById(id)) {
        throw new EntityNotFoundException("User not found");
    }

    userRepository.deleteById(id);
}

}