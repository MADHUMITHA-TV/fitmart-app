package com.fitmart.backend.controller;

import com.fitmart.backend.dto.request.UpdateOrderStatusRequest;
import com.fitmart.backend.dto.response.ApiResponse;
import com.fitmart.backend.dto.response.OrderTrackingResponse;
import com.fitmart.backend.service.OrderTrackingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-tracking")
@RequiredArgsConstructor
public class OrderTrackingController {

    private final OrderTrackingService orderTrackingService;

    // Admin updates order status
    @PutMapping("/{orderId}/status")
    public ApiResponse<OrderTrackingResponse> updateStatus(
            @PathVariable Long orderId,
            @Valid @RequestBody UpdateOrderStatusRequest request) {

        return ApiResponse.success(
                "Order status updated successfully",
                orderTrackingService.updateOrderStatus(orderId, request)
        );
    }

    // Customer/Admin views tracking history
    @GetMapping("/{orderId}")
    public ApiResponse<List<OrderTrackingResponse>> getTrackingHistory(
            @PathVariable Long orderId) {

        return ApiResponse.success(
                orderTrackingService.getTrackingHistory(orderId)
        );
    }
}