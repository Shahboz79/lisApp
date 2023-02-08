package com.lissoft.to;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentAnalyzeTO implements Serializable {
    private OrderTO order;
    private PatientTO patient;
    private List<AnalyzeItemTO> tests = new ArrayList<>();
}
