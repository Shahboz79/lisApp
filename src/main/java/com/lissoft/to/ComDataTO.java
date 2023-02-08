package com.lissoft.to;

import lombok.Data;

import java.io.Serializable;

@Data
public class ComDataTO implements Serializable {
    private String fieldName;
    private String fieldValue;

}