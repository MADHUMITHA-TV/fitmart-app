package com.fitmart.backend.repository;

import com.fitmart.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Search by product name or brand
    List<Product> findByNameContainingIgnoreCaseOrBrandContainingIgnoreCase(
            String name,
            String brand);

    // Filter by category
    List<Product> findByCategoryId(Long categoryId);

    // Filter by price range
    List<Product> findByPriceBetween(
            BigDecimal min,
            BigDecimal max);

    // Pagination
    Page<Product> findAll(Pageable pageable);

    long count();

long countByStockQuantity(Integer stockQuantity);

long countByStockQuantityLessThan(Integer stockQuantity);

}