package com.lissoft.to.http;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class MedServiceResponse implements Serializable {
    private Long MedicalServiceID;
    private String MedicalServiceName;
    private String MedicalServiceCode;
    private String MedicalServiceGroupID;
}
