package com.fitmart.backend.config;

import com.fitmart.backend.entity.Role;
import com.fitmart.backend.enums.RoleName;
import com.fitmart.backend.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class RoleDataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        for (RoleName roleName : RoleName.values()) {
            roleRepository.findByName(roleName).orElseGet(() -> {
                Role role = Role.builder().name(roleName).build();
                log.info("Seeding role: {}", roleName);
                return roleRepository.save(role);
            });
        }
    }
}
