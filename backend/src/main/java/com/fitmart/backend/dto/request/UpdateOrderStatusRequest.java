package com.fitmart.backend.dto.request;

import com.fitmart.backend.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateOrderStatusRequest {

    @NotNull
    private OrderStatus status;

    private String remarks;

}