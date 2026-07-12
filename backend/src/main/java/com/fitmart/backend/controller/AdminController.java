package com.fitmart.backend.controller;

import com.fitmart.backend.dto.request.ProductRequest;
import com.fitmart.backend.dto.response.ApiResponse;
import com.fitmart.backend.dto.response.OrderResponse;
import com.fitmart.backend.dto.response.ProductResponse;
import com.fitmart.backend.dto.response.UserResponse;
import com.fitmart.backend.enums.OrderStatus;
import com.fitmart.backend.service.AdminService;
import com.fitmart.backend.service.ProductService;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final ProductService productService;
    
    @PostConstruct
public void init() {
    System.out.println("AdminController Loaded");
}

    @GetMapping("/orders")
    public ApiResponse<List<OrderResponse>> getOrders() {

        return ApiResponse.success(
                adminService.getAllOrders());
    }

    @GetMapping("/orders/{id}")
    public ApiResponse<OrderResponse> getOrder(
            @PathVariable Long id) {

        return ApiResponse.success(
                adminService.getOrder(id));
    }

    @PutMapping("/orders/{id}/status")
    public ApiResponse<OrderResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {

        return ApiResponse.success(
                "Order Updated",
                adminService.updateOrderStatus(id, status));
    }

    @DeleteMapping("/orders/{id}")
    public ApiResponse<String> deleteOrder(
            @PathVariable Long id) {

        adminService.deleteOrder(id);

        return ApiResponse.success(
                "Deleted",
                "Order deleted successfully");
    }

    @GetMapping("/users")
public ApiResponse<List<UserResponse>> getUsers() {

    return ApiResponse.success(
            adminService.getAllUsers());
}

@GetMapping("/users/{id}")
public ApiResponse<UserResponse> getUser(
        @PathVariable Long id) {

    return ApiResponse.success(
            adminService.getUser(id));
}

@DeleteMapping("/users/{id}")
public ApiResponse<String> deleteUser(
        @PathVariable Long id) {

    adminService.deleteUser(id);

    return ApiResponse.success(
            "Deleted",
            "User deleted successfully");
}
@PostMapping("/products")
public ApiResponse<ProductResponse> createProduct(
        @RequestBody ProductRequest request){

    return ApiResponse.success(
            "Product created",
            productService.create(request));
}
@PutMapping("/products/{id}")
public ApiResponse<ProductResponse> updateProduct(
        @PathVariable Long id,
        @RequestBody ProductRequest request){

    return ApiResponse.success(
            "Product updated",
            productService.update(id,request));
}
@DeleteMapping("/products/{id}")
public ApiResponse<String> deleteProduct(
        @PathVariable Long id){

    productService.delete(id);

    return ApiResponse.success(
            "Deleted",
            "Product deleted successfully");
}
}