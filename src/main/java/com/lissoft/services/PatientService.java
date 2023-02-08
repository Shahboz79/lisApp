package com.lissoft.services;

import com.lissoft.to.AnalyzeItemTO;
import com.lissoft.to.AppointmentAnalyzeTO;
import com.lissoft.to.http.MessageResponse;
import com.lissoft.to.PatientTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PatientService {

    ResponseEntity<MessageResponse> add(PatientTO to);

    List<PatientTO> search(String keyword);

    List<PatientTO> todaysList();

    PatientTO get(Long id);

    List<AnalyzeItemTO> getLaboratory(Long laboratoryId);

    AppointmentAnalyzeTO getLaboratoryResult(Long id);

    List<PatientTO> getPatientList();
}
