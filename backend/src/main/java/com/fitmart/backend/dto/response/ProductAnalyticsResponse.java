package com.fitmart.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAnalyticsResponse {

    private Long totalProducts;

    private Long totalCategories;

    private Long outOfStockProducts;

    private Long lowStockProducts;

}