package com.fitmart.backend.repository;

import com.fitmart.backend.entity.InventoryTransaction;
import com.fitmart.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryTransactionRepository
        extends JpaRepository<InventoryTransaction, Long> {

    List<InventoryTransaction> findByProduct(Product product);

}