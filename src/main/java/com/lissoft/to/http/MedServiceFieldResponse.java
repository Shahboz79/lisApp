package com.lissoft.to.http;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class MedServiceFieldResponse implements Serializable {
    private Long MedicalServiceFieldID;
    private Integer OrderNumber;
    private String FieldName;
    private String FieldValueNorm;
    private String FieldUnitOfMeasure;
}
