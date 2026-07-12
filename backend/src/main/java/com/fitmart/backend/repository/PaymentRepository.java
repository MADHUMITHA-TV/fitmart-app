package com.fitmart.backend.repository;

import com.fitmart.backend.entity.Order;
import com.fitmart.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    Optional<Payment> findByOrder(Order order);

    List<Payment> findAllByOrderByPaidAtDesc();

}