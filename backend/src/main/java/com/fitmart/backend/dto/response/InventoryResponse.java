package com.fitmart.backend.dto.response;

import com.fitmart.backend.enums.InventoryType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryResponse {

    private Long id;

    private Long productId;

    private String productName;

    private Integer quantityChange;

    private InventoryType type;

    private String reason;

    private LocalDateTime createdAt;

}