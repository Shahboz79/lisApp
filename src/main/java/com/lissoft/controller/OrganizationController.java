package com.lissoft.controller;

import com.lissoft.services.DeviceService;
import com.lissoft.services.MedServicesService;
import com.lissoft.to.DeviceTO;
import com.lissoft.to.SimpleTO;
import com.lissoft.to.access.SyncTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/organization")
public class OrganizationController extends BaseController {

    private final MedServicesService medServicesService;
    private final DeviceService deviceService;

    @PostMapping("/device/syncData")
    public ResponseEntity<?> syncData(@RequestBody SyncTO syncTO) {
        return deviceService.syncData(syncTO);
    }
    @GetMapping("/device/list")
    public ResponseEntity<?> clinicDeviceList(@RequestParam(value = "organizationId") Long organizationId) {
        return ResponseEntity.ok(medServicesService.deviceList(organizationId));
    }
    @GetMapping("/devices")
    public ResponseEntity<?> deviceList() {
        return ResponseEntity.ok(medServicesService.devices());
    }
    @GetMapping("/clinicDevice/get")
    public ResponseEntity<?> getClinicDevice(@RequestParam(value = "id") Long clinicDeviceId) {
        return ResponseEntity.ok(medServicesService.getClinicDevice(clinicDeviceId));
    }

    @PostMapping("/device/addToClinic")
    public ResponseEntity<?> addDeviceToLaboratory(@RequestBody DeviceTO device) {
        return medServicesService.addDeviceToClinic(device);
    }
//    @PostMapping("/device/add")
//    public ResponseEntity<?> addDevice(@RequestBody SimpleTO simpleDevice) {
//        return medServicesService.addDevice((DeviceTO) simpleDevice);
//    }
    @PostMapping("/device/editToClinic")
    public ResponseEntity<?> editDeviceToLaboratory(@RequestBody DeviceTO device) {
        return medServicesService.editDeviceToClinic(device);
    }
    @GetMapping("/device/handlerTypes")
    public ResponseEntity<?> handlerTypes() {
        return ResponseEntity.ok(Arrays.asList("AccessReader", "dddddd"));
    }
}
