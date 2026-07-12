package com.fitmart.backend.controller;

import com.fitmart.backend.dto.request.PaymentRequest;
import com.fitmart.backend.dto.response.ApiResponse;
import com.fitmart.backend.dto.response.PaymentResponse;
import com.fitmart.backend.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ApiResponse<PaymentResponse> makePayment(
            @Valid @RequestBody PaymentRequest request) {

        return ApiResponse.success(
                "Payment successful",
                paymentService.makePayment(request));
    }

    @GetMapping("/{paymentId}")
    public ApiResponse<PaymentResponse> getPayment(
            @PathVariable Long paymentId) {

        return ApiResponse.success(
                paymentService.getPayment(paymentId));
    }

    @GetMapping("/order/{orderId}")
    public ApiResponse<PaymentResponse> getPaymentByOrder(
            @PathVariable Long orderId) {

        return ApiResponse.success(
                paymentService.getPaymentByOrder(orderId));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<PaymentResponse>> getAllPayments() {

        return ApiResponse.success(
                paymentService.getAllPayments());
    }

}