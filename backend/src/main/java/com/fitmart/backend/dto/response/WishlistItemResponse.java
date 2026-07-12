package com.fitmart.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistItemResponse {

    private Long productId;

    private String productName;

    private String brand;

    private BigDecimal price;

    private String imageUrl;

}