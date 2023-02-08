package com.lissoft.enums;

import java.util.Arrays;

public enum ERole {
    ADMIN(1L),
    HEAD_OF_LABORATORY(2L),
    LABORATORY(3L);

    private final Long id;

    ERole(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public static ERole get(Long id) {
        return Arrays.stream(values()).filter(r->r.getId().equals(id)).findFirst().get();
    }
}
