package com.fitmart.backend.service;

import com.fitmart.backend.dto.response.WishlistResponse;

public interface WishlistService {

    WishlistResponse addProduct(
            String email,
            Long productId);

    WishlistResponse getWishlist(
            String email);

    void removeProduct(
            String email,
            Long productId);

}