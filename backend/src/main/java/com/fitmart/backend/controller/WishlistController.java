package com.fitmart.backend.controller;

import com.fitmart.backend.dto.response.ApiResponse;
import com.fitmart.backend.dto.response.WishlistResponse;
import com.fitmart.backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/{productId}")
    public ApiResponse<WishlistResponse> addProduct(
            Authentication authentication,
            @PathVariable Long productId) {

        return ApiResponse.success(
                "Product added to wishlist",
                wishlistService.addProduct(
                        authentication.getName(),
                        productId)
        );
    }

    @GetMapping
    public ApiResponse<WishlistResponse> getWishlist(
            Authentication authentication) {

        return ApiResponse.success(
                wishlistService.getWishlist(
                        authentication.getName())
        );
    }

    @DeleteMapping("/{productId}")
    public ApiResponse<String> removeProduct(
            Authentication authentication,
            @PathVariable Long productId) {

        wishlistService.removeProduct(
                authentication.getName(),
                productId);

        return ApiResponse.success(
                "Removed successfully",
                "Product removed from wishlist");
    }

}