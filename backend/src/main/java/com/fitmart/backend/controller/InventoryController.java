package com.fitmart.backend.controller;

import com.fitmart.backend.dto.request.InventoryRequest;
import com.fitmart.backend.dto.response.ApiResponse;
import com.fitmart.backend.dto.response.InventoryResponse;
import com.fitmart.backend.dto.response.ProductResponse;
import com.fitmart.backend.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping("/restock")
    public ApiResponse<InventoryResponse> restock(
            @Valid @RequestBody InventoryRequest request) {

        return ApiResponse.success(
                "Product restocked successfully",
                inventoryService.restock(request));
    }

    @PutMapping("/update")
    public ApiResponse<InventoryResponse> updateStock(
            @Valid @RequestBody InventoryRequest request) {

        return ApiResponse.success(
                "Stock updated successfully",
                inventoryService.updateStock(request));
    }

    @GetMapping("/low-stock")
    public ApiResponse<List<ProductResponse>> lowStock() {

        return ApiResponse.success(
                inventoryService.getLowStockProducts());
    }

    @GetMapping("/out-of-stock")
    public ApiResponse<List<ProductResponse>> outOfStock() {

        return ApiResponse.success(
                inventoryService.getOutOfStockProducts());
    }

    @GetMapping("/history")
    public ApiResponse<List<InventoryResponse>> history() {

        return ApiResponse.success(
                inventoryService.getInventoryHistory());
    }

    @GetMapping("/history/{productId}")
    public ApiResponse<List<InventoryResponse>> historyByProduct(
            @PathVariable Long productId) {

        return ApiResponse.success(
                inventoryService.getProductHistory(productId));
    }

}