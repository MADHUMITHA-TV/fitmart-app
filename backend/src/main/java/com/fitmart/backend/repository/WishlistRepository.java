package com.fitmart.backend.repository;

import com.fitmart.backend.entity.User;
import com.fitmart.backend.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishlistRepository
        extends JpaRepository<Wishlist, Long> {

    Optional<Wishlist> findByUser(User user);

}