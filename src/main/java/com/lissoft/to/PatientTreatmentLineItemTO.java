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
public class PatientTreatmentLineItemTO implements Serializable {
    private Integer appointmentId;
    private Integer senderMemberId;
    private List<SimpleTO> lineItems = new ArrayList<>();
}
