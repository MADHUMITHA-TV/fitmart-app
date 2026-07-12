package com.fitmart.backend.util;

import com.fitmart.backend.dto.response.WishlistItemResponse;
import com.fitmart.backend.dto.response.WishlistResponse;
import com.fitmart.backend.entity.Wishlist;

public final class WishlistMapper {

    private WishlistMapper() {
    }

    public static WishlistResponse toResponse(
            Wishlist wishlist) {

        return WishlistResponse.builder()
                .wishlistId(wishlist.getId())
                .items(
                        wishlist.getItems()
                                .stream()
                                .map(item ->
                                        WishlistItemResponse.builder()
                                                .productId(item.getProduct().getId())
                                                .productName(item.getProduct().getName())
                                                .brand(item.getProduct().getBrand())
                                                .price(item.getProduct().getPrice())
                                                .imageUrl(item.getProduct().getImageUrl())
                                                .build())
                                .toList()
                )
                .build();
    }
}