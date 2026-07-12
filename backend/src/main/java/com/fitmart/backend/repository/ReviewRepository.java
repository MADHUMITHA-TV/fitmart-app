package com.fitmart.backend.repository;

import com.fitmart.backend.entity.Product;
import com.fitmart.backend.entity.Review;
import com.fitmart.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

    List<Review> findByProduct(Product product);

    List<Review> findByUser(User user);

    Optional<Review> findByUserAndProduct(
            User user,
            Product product
    );

    @Query("""
            SELECT AVG(r.rating)
            FROM Review r
            """)
    Double getAverageRating();


}