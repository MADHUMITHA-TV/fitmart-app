package com.fitmart.backend.service;

import com.fitmart.backend.dto.request.LoginRequest;
import com.fitmart.backend.dto.request.RegisterRequest;
import com.fitmart.backend.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
