package com.fitmart.backend.service;

import com.fitmart.backend.dto.request.ProductRequest;
import com.fitmart.backend.dto.response.ProductResponse;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {

    ProductResponse create(ProductRequest request);

    ProductResponse update(
            Long id,
            ProductRequest request);

    void delete(Long id);

    ProductResponse getById(Long id);

    List<ProductResponse> getAll();

    // Search
    List<ProductResponse> search(String keyword);

    // Category Filter
    List<ProductResponse> getByCategory(Long categoryId);

    // Price Filter
    List<ProductResponse> getByPriceRange(
            BigDecimal min,
            BigDecimal max);

    // Pagination + Sorting
    Page<ProductResponse> getProducts(
            int page,
            int size,
            String sortBy,
            String direction);

}