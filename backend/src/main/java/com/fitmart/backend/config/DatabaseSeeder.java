package com.fitmart.backend.config;

import com.fitmart.backend.entity.Category;
import com.fitmart.backend.entity.Role;
import com.fitmart.backend.entity.User;
import com.fitmart.backend.enums.RoleName;
import com.fitmart.backend.repository.CategoryRepository;
import com.fitmart.backend.repository.RoleRepository;
import com.fitmart.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    // Optional: set ADMIN_SEED_PASSWORD as an env var locally/on Render.
    // If not set, a random password is generated and printed ONCE, only
    // when a new admin account is actually created.
    @Value("${ADMIN_SEED_PASSWORD:}")
    private String adminSeedPassword;

    @Override
    public void run(String... args) {

        // ===========================
        // Create Roles
        // ===========================

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseGet(() ->
                        roleRepository.save(
                                Role.builder()
                                        .name(RoleName.ROLE_USER)
                                        .build()
                        ));

        Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseGet(() ->
                        roleRepository.save(
                                Role.builder()
                                        .name(RoleName.ROLE_ADMIN)
                                        .build()
                        ));

        // ===========================
        // Seed Categories
        // ===========================

        if (categoryRepository.count() == 0) {

            categoryRepository.save(Category.builder()
                    .name("Protein")
                    .description("Protein supplements")
                    .build());

            categoryRepository.save(Category.builder()
                    .name("Mass Gainer")
                    .description("Weight gain supplements")
                    .build());

            categoryRepository.save(Category.builder()
                    .name("Creatine")
                    .description("Strength supplements")
                    .build());

            categoryRepository.save(Category.builder()
                    .name("Pre Workout")
                    .description("Energy boosting supplements")
                    .build());

            categoryRepository.save(Category.builder()
                    .name("Vitamins")
                    .description("Health and wellness supplements")
                    .build());

            categoryRepository.save(Category.builder()
                    .name("Fat Burner")
                    .description("Weight loss supplements")
                    .build());

            log.info("Categories seeded successfully.");
        }

        // ===========================
        // Create Admin (ONLY if one does not already exist)
        // ===========================

        boolean adminExists = userRepository.findByEmail("admin@fitmart.com").isPresent();

        if (!adminExists) {

            String passwordToUse = (adminSeedPassword != null && !adminSeedPassword.isBlank())
                    ? adminSeedPassword
                    : UUID.randomUUID().toString();

            User admin = User.builder()
                    .email("admin@fitmart.com")
                    .firstName("FitMart")
                    .lastName("Admin")
                    .phone("9999999999")
                    .enabled(true)
                    .build();

            admin.setPassword(passwordEncoder.encode(passwordToUse));
            admin.setRoles(Set.of(adminRole));
            admin.setEnabled(true);

            userRepository.save(admin);

            log.info("Admin user created for the first time.");

            if (adminSeedPassword == null || adminSeedPassword.isBlank()) {
                // Only reachable in logs once, on first-ever creation, and only
                // if you didn't set ADMIN_SEED_PASSWORD yourself. Change this
                // password immediately after first login.
                log.warn("No ADMIN_SEED_PASSWORD set. Generated a random one-time " +
                        "admin password. Set ADMIN_SEED_PASSWORD as an env var instead, " +
                        "or log in and change it immediately: {}", passwordToUse);
            }

        } else {
            log.info("Admin user already exists — leaving password untouched.");
        }
    }
}