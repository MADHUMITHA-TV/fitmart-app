package com.fitmart.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RevenueResponse {

    private BigDecimal totalRevenue;

    private BigDecimal todayRevenue;

    private BigDecimal monthlyRevenue;

}