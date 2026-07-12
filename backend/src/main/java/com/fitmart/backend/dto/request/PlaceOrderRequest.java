package com.fitmart.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaceOrderRequest {

    /*
     * Keeping this DTO for future enhancements like:
     * - Shipping Address
     * - Payment Method
     * - Coupon Code
     * - Notes
     */

    private String shippingAddress;

    private String paymentMethod;

    private String notes;

}