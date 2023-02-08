package com.lissoft.to.http;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class HttpResponse<T> implements Serializable {
    private Boolean success;
    private String error;
    private List<T> result;
}
