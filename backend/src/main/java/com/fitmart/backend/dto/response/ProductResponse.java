package com.fitmart.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stockQuantity;
     private Integer soldQuantity; 

    private String brand;

    private String imageUrl;

    private Long categoryId;

    private String categoryName;

}