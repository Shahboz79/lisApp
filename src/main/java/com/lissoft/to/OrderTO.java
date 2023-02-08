package com.lissoft.to;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderTO implements Serializable {
    private Long id;
    private String num;
    private String date;
    private Long OrganizationID;
}
