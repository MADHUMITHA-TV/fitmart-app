package com.fitmart.backend.controller;

import com.fitmart.backend.dto.request.AddToCartRequest;
import com.fitmart.backend.dto.request.UpdateCartRequest;
import com.fitmart.backend.dto.response.ApiResponse;
import com.fitmart.backend.dto.response.CartResponse;
import com.fitmart.backend.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ApiResponse<CartResponse> addToCart(
            Authentication authentication,
            @Valid @RequestBody AddToCartRequest request) {

        return ApiResponse.success(
                "Product added to cart",
                cartService.addToCart(authentication.getName(), request)
        );
    }

    @PutMapping("/{cartItemId}")
    public ApiResponse<CartResponse> updateQuantity(
            Authentication authentication,
            @PathVariable Long cartItemId,
            @Valid @RequestBody UpdateCartRequest request) {

        return ApiResponse.success(
                "Cart updated",
                cartService.updateQuantity(
                        authentication.getName(),
                        cartItemId,
                        request)
        );
    }

    @DeleteMapping("/{cartItemId}")
    public ApiResponse<CartResponse> removeItem(
            Authentication authentication,
            @PathVariable Long cartItemId) {

        return ApiResponse.success(
                "Item removed",
                cartService.removeItem(
                        authentication.getName(),
                        cartItemId)
        );
    }

    @DeleteMapping
    public ApiResponse<CartResponse> clearCart(
            Authentication authentication) {

        return ApiResponse.success(
                "Cart cleared",
                cartService.clearCart(authentication.getName())
        );
    }

    @GetMapping
    public ApiResponse<CartResponse> getCart(
            Authentication authentication) {

        return ApiResponse.success(
                cartService.getCart(authentication.getName())
        );
    }

}