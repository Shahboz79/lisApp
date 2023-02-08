package com.lissoft.enums;

import com.lissoft.to.SimpleTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public enum Position {

    Administrator(1, "Администратор"),
    HeadOfLaboratory(2, "Лаборатория мудир(ас)и"),
    Laboratory(3, "Лаборант");

    private Integer id;
    private String name;

    Position(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public static Position get(Integer id) {
        return Arrays.stream(values()).filter(v-> Objects.equals(v.id, id)).findFirst().get();
    }

    public static SimpleTO getTO(Integer id) {
        if (id == null || id <= 0) return new SimpleTO();
        Position position = Arrays.stream(values()).filter(v -> Objects.equals(v.id, id)).findFirst().get();
        return toTO(position);
    }

    public static SimpleTO toTO(Position position) {
        return new SimpleTO(position.getId().longValue(), position.getName());
    }

    public static List<SimpleTO> list() {
        return Arrays.stream(values()).map(Position::toTO).collect(Collectors.toList());
    }
}
