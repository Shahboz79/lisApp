package com.lissoft.to;

import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientTO implements Serializable {

    private Long id;
    private String last_name;
    private String first_name;
    private String middle_name;
    private Date birthdate;
    private String sex;
    private String cellphone;
    private String email;

}
