package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.request.ProductRequest;
import com.fitmart.backend.dto.response.ProductResponse;
import com.fitmart.backend.entity.Category;
import com.fitmart.backend.entity.Product;
import com.fitmart.backend.exception.ResourceNotFoundException;
import com.fitmart.backend.repository.CategoryRepository;
import com.fitmart.backend.repository.ProductRepository;
import com.fitmart.backend.service.ProductService;
import com.fitmart.backend.util.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductResponse create(ProductRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .brand(request.getBrand())
                .imageUrl(request.getImageUrl())
                .category(category)
                .build();

        return ProductMapper.toResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse update(Long id, ProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setBrand(request.getBrand());
        product.setImageUrl(request.getImageUrl());
        product.setCategory(category);

        return ProductMapper.toResponse(productRepository.save(product));
    }

    @Override
    public void delete(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        productRepository.delete(product);
    }

    @Override
    public ProductResponse getById(Long id) {

        return ProductMapper.toResponse(
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Product not found")));
    }

    @Override
    public List<ProductResponse> getAll() {

        return productRepository.findAll()
                .stream()
                .map(ProductMapper::toResponse)
                .toList();
    }

    // ==============================
    // Search
    // ==============================

    @Override
    public List<ProductResponse> search(String keyword) {

        return productRepository
                .findByNameContainingIgnoreCaseOrBrandContainingIgnoreCase(
                        keyword,
                        keyword)
                .stream()
                .map(ProductMapper::toResponse)
                .toList();
    }

    // ==============================
    // Category Filter
    // ==============================

    @Override
    public List<ProductResponse> getByCategory(Long categoryId) {

        return productRepository
                .findByCategoryId(categoryId)
                .stream()
                .map(ProductMapper::toResponse)
                .toList();
    }

    // ==============================
    // Price Filter
    // ==============================

    @Override
    public List<ProductResponse> getByPriceRange(
            BigDecimal min,
            BigDecimal max) {

        return productRepository
                .findByPriceBetween(min, max)
                .stream()
                .map(ProductMapper::toResponse)
                .toList();
    }

    // ==============================
    // Pagination + Sorting
    // ==============================

    @Override
    public Page<ProductResponse> getProducts(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return productRepository.findAll(pageable)
                .map(ProductMapper::toResponse);
    }

}