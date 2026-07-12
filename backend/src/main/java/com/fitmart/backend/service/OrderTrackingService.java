package com.fitmart.backend.service;

import com.fitmart.backend.dto.request.UpdateOrderStatusRequest;
import com.fitmart.backend.dto.response.OrderTrackingResponse;

import java.util.List;

public interface OrderTrackingService {

    OrderTrackingResponse updateOrderStatus(
            Long orderId,
            UpdateOrderStatusRequest request
    );

    List<OrderTrackingResponse> getTrackingHistory(
            Long orderId
    );

}