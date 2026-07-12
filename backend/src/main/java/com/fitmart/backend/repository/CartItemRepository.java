package com.fitmart.backend.repository;

import com.fitmart.backend.entity.Cart;
import com.fitmart.backend.entity.CartItem;
import com.fitmart.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

}