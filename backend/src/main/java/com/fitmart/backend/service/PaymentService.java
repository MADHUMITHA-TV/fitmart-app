package com.fitmart.backend.service;

import com.fitmart.backend.dto.request.PaymentRequest;
import com.fitmart.backend.dto.response.PaymentResponse;

import java.util.List;

public interface PaymentService {

    PaymentResponse makePayment(
            PaymentRequest request);

    PaymentResponse getPayment(
            Long paymentId);

    PaymentResponse getPaymentByOrder(
            Long orderId);

    List<PaymentResponse> getAllPayments();

}