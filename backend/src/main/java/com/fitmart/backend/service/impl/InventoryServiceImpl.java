package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.request.InventoryRequest;
import com.fitmart.backend.dto.response.InventoryResponse;
import com.fitmart.backend.dto.response.ProductResponse;
import com.fitmart.backend.entity.InventoryTransaction;
import com.fitmart.backend.entity.Product;
import com.fitmart.backend.enums.InventoryType;
import com.fitmart.backend.exception.ResourceNotFoundException;
import com.fitmart.backend.repository.InventoryTransactionRepository;
import com.fitmart.backend.repository.ProductRepository;
import com.fitmart.backend.service.InventoryService;
import com.fitmart.backend.util.InventoryMapper;
import com.fitmart.backend.util.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryServiceImpl implements InventoryService {

    private final ProductRepository productRepository;

    private final InventoryTransactionRepository inventoryRepository;

    @Override
    public InventoryResponse restock(InventoryRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        product.setStockQuantity(
                product.getStockQuantity() + request.getQuantity());

        productRepository.save(product);

        InventoryTransaction transaction = InventoryTransaction.builder()
                .product(product)
                .quantityChange(request.getQuantity())
                .type(InventoryType.RESTOCK)
                .reason(request.getReason())
                .build();

        return InventoryMapper.toResponse(
                inventoryRepository.save(transaction));

    }

    @Override
    public InventoryResponse updateStock(InventoryRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        int difference =
                request.getQuantity() - product.getStockQuantity();

        product.setStockQuantity(request.getQuantity());

        productRepository.save(product);

        InventoryTransaction transaction = InventoryTransaction.builder()
                .product(product)
                .quantityChange(difference)
                .type(InventoryType.MANUAL_UPDATE)
                .reason(request.getReason())
                .build();

        return InventoryMapper.toResponse(
                inventoryRepository.save(transaction));

    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getLowStockProducts() {

        return productRepository.findAll()
                .stream()
                .filter(product ->
                        product.getStockQuantity() <= 10)
                .map(ProductMapper::toResponse)
                .toList();

    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getOutOfStockProducts() {

        return productRepository.findAll()
                .stream()
                .filter(product ->
                        product.getStockQuantity() == 0)
                .map(ProductMapper::toResponse)
                .toList();

    }

    @Override
    @Transactional(readOnly = true)
    public List<InventoryResponse> getInventoryHistory() {

        return inventoryRepository.findAll()
                .stream()
                .map(InventoryMapper::toResponse)
                .toList();

    }

    @Override
    @Transactional(readOnly = true)
    public List<InventoryResponse> getProductHistory(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        return inventoryRepository.findByProduct(product)
                .stream()
                .map(InventoryMapper::toResponse)
                .toList();

    }

}