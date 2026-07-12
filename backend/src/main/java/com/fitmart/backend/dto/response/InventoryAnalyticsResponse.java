package com.fitmart.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryAnalyticsResponse {

    private Long outOfStockProducts;

    private Long lowStockProducts;

}