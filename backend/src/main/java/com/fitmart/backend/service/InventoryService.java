package com.fitmart.backend.service;

import com.fitmart.backend.dto.request.InventoryRequest;
import com.fitmart.backend.dto.response.InventoryResponse;
import com.fitmart.backend.dto.response.ProductResponse;

import java.util.List;

public interface InventoryService {

    InventoryResponse restock(InventoryRequest request);

    InventoryResponse updateStock(InventoryRequest request);

    List<ProductResponse> getLowStockProducts();

    List<ProductResponse> getOutOfStockProducts();

    List<InventoryResponse> getInventoryHistory();

    List<InventoryResponse> getProductHistory(Long productId);

}