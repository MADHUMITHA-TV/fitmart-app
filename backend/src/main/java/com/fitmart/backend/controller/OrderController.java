package com.fitmart.backend.controller;

import com.fitmart.backend.dto.request.PlaceOrderRequest;
import com.fitmart.backend.dto.response.ApiResponse;
import com.fitmart.backend.dto.response.OrderResponse;
import com.fitmart.backend.enums.OrderStatus;
import com.fitmart.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ApiResponse<OrderResponse> placeOrder(
            Authentication authentication,
            @RequestBody PlaceOrderRequest request) {

        return ApiResponse.success(
                "Order placed successfully",
                orderService.placeOrder(
                        authentication.getName(),
                        request
                )
        );
    }

    @GetMapping("/my")
    public ApiResponse<List<OrderResponse>> getMyOrders(
            Authentication authentication) {

        return ApiResponse.success(
                orderService.getMyOrders(
                        authentication.getName()
                )
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderResponse> getOrder(
            Authentication authentication,
            @PathVariable Long id) {

        return ApiResponse.success(
                orderService.getOrderById(
                        authentication.getName(),
                        id
                )
        );
    }

    @PutMapping("/{id}/status")
    public ApiResponse<OrderResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {

        return ApiResponse.success(
                "Order updated",
                orderService.updateStatus(id, status)
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteOrder(
            @PathVariable Long id) {

        orderService.deleteOrder(id);

        return ApiResponse.success(
                "Deleted",
                "Order deleted successfully"
        );
    }

}