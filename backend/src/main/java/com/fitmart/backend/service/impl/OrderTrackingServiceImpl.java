package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.request.UpdateOrderStatusRequest;
import com.fitmart.backend.dto.response.OrderTrackingResponse;
import com.fitmart.backend.entity.Order;
import com.fitmart.backend.entity.OrderTracking;
import com.fitmart.backend.exception.ResourceNotFoundException;
import com.fitmart.backend.repository.OrderRepository;
import com.fitmart.backend.repository.OrderTrackingRepository;
import com.fitmart.backend.service.OrderTrackingService;
import com.fitmart.backend.util.OrderTrackingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderTrackingServiceImpl implements OrderTrackingService {

    private final OrderRepository orderRepository;

    private final OrderTrackingRepository orderTrackingRepository;

    @Override
    public OrderTrackingResponse updateOrderStatus(
            Long orderId,
            UpdateOrderStatusRequest request) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        // Update current order status
        order.setStatus(request.getStatus());

        orderRepository.save(order);

        // Save tracking history
        OrderTracking tracking = OrderTracking.builder()
                .order(order)
                .status(request.getStatus())
                .remarks(request.getRemarks())
                .build();

        tracking = orderTrackingRepository.save(tracking);

        return OrderTrackingMapper.toResponse(tracking);

    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderTrackingResponse> getTrackingHistory(
            Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        return orderTrackingRepository
                .findByOrderOrderByUpdatedAtAsc(order)
                .stream()
                .map(OrderTrackingMapper::toResponse)
                .toList();

    }

}