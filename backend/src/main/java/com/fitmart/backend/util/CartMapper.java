package com.fitmart.backend.util;

import com.fitmart.backend.dto.response.CartItemResponse;
import com.fitmart.backend.dto.response.CartResponse;
import com.fitmart.backend.entity.Cart;
import com.fitmart.backend.entity.CartItem;

import java.math.BigDecimal;
import java.util.List;

public class CartMapper {

    private CartMapper() {
    }

    public static CartItemResponse toItemResponse(CartItem item) {

        return CartItemResponse.builder()
                .cartItemId(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .imageUrl(item.getProduct().getImageUrl())
                .price(item.getProduct().getPrice())
                .quantity(item.getQuantity())
                .totalPrice(item.getTotalPrice())
                .build();
    }

    public static CartResponse toResponse(Cart cart) {

        List<CartItemResponse> items = cart.getItems()
                .stream()
                .map(CartMapper::toItemResponse)
                .toList();

        BigDecimal grandTotal = cart.getItems()
                .stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalItems = cart.getItems()
                .stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        return CartResponse.builder()
                .cartId(cart.getId())
                .items(items)
                .grandTotal(grandTotal)
                .totalItems(totalItems)
                .build();
    }

}