package com.fitmart.backend.controller;

import com.fitmart.backend.dto.request.ProductRequest;
import com.fitmart.backend.dto.response.ApiResponse;
import com.fitmart.backend.dto.response.ProductResponse;
import com.fitmart.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // =========================
    // CRUD
    // =========================

    @PostMapping
    public ApiResponse<ProductResponse> create(
            @Valid @RequestBody ProductRequest request) {

        return ApiResponse.success(
                "Product created",
                productService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<ProductResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return ApiResponse.success(
                "Product updated",
                productService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(
            @PathVariable Long id) {

        productService.delete(id);

        return ApiResponse.success(
                "Deleted",
                "Product deleted successfully");
    }

    @GetMapping("/{id}")
    public ApiResponse<ProductResponse> getById(
            @PathVariable Long id) {

        return ApiResponse.success(
                productService.getById(id));
    }

    @GetMapping
    public ApiResponse<List<ProductResponse>> getAll() {

        return ApiResponse.success(
                productService.getAll());
    }

    // =========================
    // Search
    // =========================

    @GetMapping("/search")
    public ApiResponse<List<ProductResponse>> search(
            @RequestParam String keyword) {

        return ApiResponse.success(
                productService.search(keyword));
    }

    // =========================
    // Category Filter
    // =========================

    @GetMapping("/category/{categoryId}")
    public ApiResponse<List<ProductResponse>> getByCategory(
            @PathVariable Long categoryId) {

        return ApiResponse.success(
                productService.getByCategory(categoryId));
    }

    // =========================
    // Price Filter
    // =========================

    @GetMapping("/price")
    public ApiResponse<List<ProductResponse>> getByPriceRange(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max) {

        return ApiResponse.success(
                productService.getByPriceRange(min, max));
    }

    // =========================
    // Pagination + Sorting
    // =========================

    @GetMapping("/page")
    public ApiResponse<Page<ProductResponse>> getProducts(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size,

            @RequestParam(defaultValue = "id")
            String sortBy,

            @RequestParam(defaultValue = "asc")
            String direction) {

        return ApiResponse.success(
                productService.getProducts(
                        page,
                        size,
                        sortBy,
                        direction));
    }

}