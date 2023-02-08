package com.lissoft.controller;

import com.lissoft.services.MedServicesService;
import com.lissoft.to.DeviceTO;
import com.lissoft.to.SimpleTO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController extends BaseController {

    private final MedServicesService service;
    @ApiOperation(value = "Admin API List", notes = "All APIs for admin")
    @PostMapping("/")
    public ResponseEntity<?> authenticateUser() {
        return ResponseEntity.ok("OK");
    }

    @PostMapping("/device/add")
    public ResponseEntity<?> addDevice(@RequestBody SimpleTO device) {
        return service.addDevice(device);
    }
}
