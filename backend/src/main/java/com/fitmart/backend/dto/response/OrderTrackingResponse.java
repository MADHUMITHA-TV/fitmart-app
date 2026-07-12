package com.fitmart.backend.dto.response;

import com.fitmart.backend.enums.OrderStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderTrackingResponse {

    private Long id;

    private Long orderId;

    private OrderStatus status;

    private String remarks;

    private LocalDateTime updatedAt;

}