package com.fitmart.backend.util;

import com.fitmart.backend.dto.response.InventoryResponse;
import com.fitmart.backend.entity.InventoryTransaction;

public final class InventoryMapper {

    private InventoryMapper() {
    }

    public static InventoryResponse toResponse(InventoryTransaction transaction) {

        return InventoryResponse.builder()
                .id(transaction.getId())
                .productId(transaction.getProduct().getId())
                .productName(transaction.getProduct().getName())
                .quantityChange(transaction.getQuantityChange())
                .type(transaction.getType())
                .reason(transaction.getReason())
                .createdAt(transaction.getCreatedAt())
                .build();

    }

}