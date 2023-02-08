package com.lissoft.to.access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SampleTO implements Serializable {

    private Integer id;
    private Integer patientId;
    private Date testDate;

}
