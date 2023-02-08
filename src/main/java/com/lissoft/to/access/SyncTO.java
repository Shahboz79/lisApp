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
public class SyncTO implements Serializable {

    private Long deviceId;
    private Long startDate;
    private Long endDate;

}
