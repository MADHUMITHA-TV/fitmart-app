package com.fitmart.backend.repository;

import com.fitmart.backend.entity.Order;
import com.fitmart.backend.entity.OrderTracking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderTrackingRepository
        extends JpaRepository<OrderTracking, Long> {

    List<OrderTracking> findByOrderOrderByUpdatedAtAsc(Order order);

}