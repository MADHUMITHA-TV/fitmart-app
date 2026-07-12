package com.fitmart.backend.repository;

import com.fitmart.backend.entity.Order;
import com.fitmart.backend.entity.User;
import com.fitmart.backend.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);

    List<Order> findAllByOrderByCreatedAtDesc();

    List<Order> findTop5ByOrderByCreatedAtDesc();

    long count();

    long countByStatus(OrderStatus status);

    @Query("""
        SELECT COALESCE(SUM(o.totalAmount),0)
        FROM Order o
    """)
    BigDecimal getTotalRevenue();

    @Query("""
        SELECT COALESCE(SUM(o.totalAmount),0)
        FROM Order o
        WHERE o.createdAt >= :start
    """)
    BigDecimal getRevenueAfter(@Param("start") LocalDateTime start);

}