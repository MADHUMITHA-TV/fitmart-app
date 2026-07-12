package com.fitmart.backend.repository;

import com.fitmart.backend.entity.Product;
import com.fitmart.backend.entity.Wishlist;
import com.fitmart.backend.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishlistItemRepository
        extends JpaRepository<WishlistItem, Long> {

    Optional<WishlistItem> findByWishlistAndProduct(
            Wishlist wishlist,
            Product product
    );

    void deleteByWishlistAndProduct(
            Wishlist wishlist,
            Product product
    );

}