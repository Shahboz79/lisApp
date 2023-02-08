package com.lissoft.controller;

import com.lissoft.security.services.UserDetailsImpl;
import com.lissoft.to.http.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class BaseController {

    public Long getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        if (!authentication.isAuthenticated() || userDetails == null) return null;
        return userDetails.getId();
    }

    public ResponseEntity<?> successResponse(String message) {
        return ResponseEntity.ok(new MessageResponse(message));
    }

    public ResponseEntity<?> errorResponse(String message) {
        return ResponseEntity.badRequest().body(new MessageResponse(message));
    }
}
