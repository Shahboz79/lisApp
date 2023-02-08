package com.lissoft.services;

import com.lissoft.to.AnalyzeItemTO;
import com.lissoft.to.AppointmentAnalyzeTO;
import com.lissoft.to.http.MessageResponse;
import com.lissoft.to.PatientTO;
import com.lissoft.entity.AppointmentAnalyzeItem;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AppointmentService {

    ResponseEntity<?> addAnalyzesToPatient(AppointmentAnalyzeTO laboratoryTO);
    ResponseEntity<?> list(Long startDate, Long endDate);

    List<PatientTO> getListForLaboratory();

    ResponseEntity<MessageResponse> printBarCode(Long appointmentId);

    List<AnalyzeItemTO> getLaboratoryItemsByDevice(Long appointmentId, String deviceCode);

    ResponseEntity<?> saveLaboratoryItemResult(Long appLabItemId, String result);

    AppointmentAnalyzeItem getAppointmentLaboratoryItem(Long id);

    ResponseEntity<?> enterAnalyzesResult(AppointmentAnalyzeTO to);
}
