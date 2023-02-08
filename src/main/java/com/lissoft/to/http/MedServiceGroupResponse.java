package com.lissoft.to.http;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class MedServiceGroupResponse implements Serializable {
    private Long MedicalServiceGroupID;
    private String MedicalServiceGroupName;
}
