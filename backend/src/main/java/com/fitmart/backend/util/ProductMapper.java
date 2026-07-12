package com.fitmart.backend.util;

import com.fitmart.backend.dto.response.ProductResponse;
import com.fitmart.backend.entity.Product;

public class ProductMapper {

    private ProductMapper(){}

    public static ProductResponse toResponse(Product product){

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .soldQuantity(product.getSoldQuantity()) 
                .brand(product.getBrand())
                .imageUrl(product.getImageUrl())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .build();
    }

}