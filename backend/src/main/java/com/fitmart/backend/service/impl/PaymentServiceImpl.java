package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.request.PaymentRequest;
import com.fitmart.backend.dto.response.PaymentResponse;
import com.fitmart.backend.entity.Order;
import com.fitmart.backend.entity.Payment;
import com.fitmart.backend.enums.OrderStatus;
import com.fitmart.backend.enums.PaymentStatus;
import com.fitmart.backend.exception.BadRequestException;
import com.fitmart.backend.exception.ResourceNotFoundException;
import com.fitmart.backend.repository.OrderRepository;
import com.fitmart.backend.repository.PaymentRepository;
import com.fitmart.backend.service.PaymentService;
import com.fitmart.backend.util.PaymentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    private final OrderRepository orderRepository;

    @Override
    public PaymentResponse makePayment(PaymentRequest request) {

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        if (paymentRepository.findByOrder(order).isPresent()) {
            throw new BadRequestException("Payment already completed.");
        }

        Payment payment = Payment.builder()
                .order(order)
                .amount(order.getTotalAmount())
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus(PaymentStatus.SUCCESS)
                .transactionId(UUID.randomUUID().toString())
                .build();

        payment = paymentRepository.save(payment);

        order.setStatus(OrderStatus.PAID);

        orderRepository.save(order);

        return PaymentMapper.toResponse(payment);

    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPayment(Long paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found"));

        return PaymentMapper.toResponse(payment);

    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPaymentByOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        Payment payment = paymentRepository.findByOrder(order)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found"));

        return PaymentMapper.toResponse(payment);

    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getAllPayments() {

        return paymentRepository.findAllByOrderByPaidAtDesc()
                .stream()
                .map(PaymentMapper::toResponse)
                .toList();

    }

}