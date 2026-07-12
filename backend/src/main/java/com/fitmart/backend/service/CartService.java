package com.fitmart.backend.service;

import com.fitmart.backend.dto.request.AddToCartRequest;
import com.fitmart.backend.dto.request.UpdateCartRequest;
import com.fitmart.backend.dto.response.CartResponse;

public interface CartService {

    CartResponse addToCart(String email, AddToCartRequest request);

    CartResponse updateQuantity(String email,
                                Long cartItemId,
                                UpdateCartRequest request);

    CartResponse removeItem(String email,
                            Long cartItemId);

    CartResponse clearCart(String email);

    CartResponse getCart(String email);

}