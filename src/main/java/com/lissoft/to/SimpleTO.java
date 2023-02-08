package com.lissoft.to;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SimpleTO implements Serializable {
    public Long id;
    protected String name = "";
    protected String code = "";

    public SimpleTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public SimpleTO toTO() {
        return new SimpleTO(getId(), getName(), getCode());
    }
}
