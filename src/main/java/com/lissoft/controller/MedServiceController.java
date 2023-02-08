package com.lissoft.controller;

import com.lissoft.services.MedServicesService;
import com.lissoft.to.LaboratoryTO;
import com.lissoft.to.MedServiceGroupTO;
import com.lissoft.to.http.MessageResponse;
import com.lissoft.to.http.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/medService")
public class MedServiceController extends BaseController {

    private final MedServicesService service;

    @GetMapping("/list")
    public ResponseEntity<?> list(@RequestParam(value = "organizationId", required = false) Long organizationId) {
        return ResponseEntity.ok(new HttpResponse<>(true, null, service.list(organizationId)));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody LaboratoryTO to) {
        return service.addEditMedService(to);
    }

    @GetMapping("/get")
    public ResponseEntity<?> get(@RequestParam("id") Long id) {
        return service.get(id);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> edit(@RequestBody LaboratoryTO to) {
        return service.addEditMedService(to);
    }

    @GetMapping("/group/list")
    public ResponseEntity<?> groupList(@RequestParam(value = "organizationId", required = false) Long organizationId) {
        return ResponseEntity.ok(service.groupList(organizationId));
    }

    @PostMapping("/group/add")
    public ResponseEntity<?> groupAdd(@RequestBody MedServiceGroupTO to) {
        return service.addEditMedServiceGroup(to);
    }

    @PutMapping("/group/edit")
    public ResponseEntity<?> groupEdit(@RequestBody MedServiceGroupTO to) {
        return service.addEditMedServiceGroup(to);
    }


}
