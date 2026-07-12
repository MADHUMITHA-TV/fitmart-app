package com.fitmart.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;

    private String email;

    private String firstName;

    private String lastName;

    private String phone;

    private Set<String> roles;

    // NEW FIELDS

    private Integer totalOrders;

    private BigDecimal totalSpent;

}