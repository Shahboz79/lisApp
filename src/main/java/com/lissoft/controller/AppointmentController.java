package com.lissoft.controller;

import com.lissoft.services.AppointmentService;
import com.lissoft.services.PatientService;
import com.lissoft.to.AppointmentAnalyzeTO;
import com.lissoft.to.http.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointment")
public class AppointmentController extends BaseController {

    private final AppointmentService service;
    private final PatientService patientService;

    @PreAuthorize("hasAnyRole('ADMIN','LABORATORY')")
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody AppointmentAnalyzeTO to) {
        return service.addAnalyzesToPatient(to);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_LABORATORY')")
    @PostMapping("/list")
    public ResponseEntity<?> list(@RequestParam("startDate") Long startDate,
                                  @RequestParam("endDate") Long endDate
                                  ) {
        return service.list(startDate, endDate);
    }

    @PreAuthorize("hasAnyRole('ADMIN','LABORATORY')")
    @GetMapping("/analyze/result/get")
    public ResponseEntity<?> getAnalyzesResult(@RequestParam(value = "appointmentId") Long appointmentId) {
        return ResponseEntity.ok(patientService.getLaboratoryResult(appointmentId));
    }

    @PreAuthorize("hasRole('LABORATORY')")
    @PutMapping("/analyze/result/enter")
    public ResponseEntity<?> enterAnalyzesResult(@RequestBody AppointmentAnalyzeTO to) {
        return service.enterAnalyzesResult(to);
    }

    @PreAuthorize("hasAnyRole('ADMIN','LABORATORY')")
    @GetMapping("/patient/list")
    public ResponseEntity<?> patientList() {
        return ResponseEntity.ok(new HttpResponse(true, null, patientService.getPatientList()));
    }
}
