package com.fitmart.backend.util;

import com.fitmart.backend.dto.response.UserResponse;
import com.fitmart.backend.entity.User;
import java.util.stream.Collectors;

public final class UserMapper {

    private UserMapper() {
    }

    public static UserResponse toResponse(User user) {

    return UserResponse.builder()

            .id(user.getId())

            .email(user.getEmail())

            .firstName(user.getFirstName())

            .lastName(user.getLastName())

            .phone(user.getPhone())

            .roles(
                    user.getRoles()
                            .stream()
                            .map(role -> role.getName().name())
                            .collect(Collectors.toSet())
            )

            .totalOrders(user.getTotalOrders())

            .totalSpent(user.getTotalSpent())

            .build();
}
}
