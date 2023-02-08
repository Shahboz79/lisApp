package com.lissoft.services;

import com.lissoft.to.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MedServicesService {
    List<SimpleTO> list(Long organizationId);

    ResponseEntity<?> addEditMedService(LaboratoryTO to);
    ResponseEntity<?> get(Long id);

    List<DeviceTO> deviceList(Long laboratoryId);

    ResponseEntity<?> addDevice(SimpleTO device);

    ResponseEntity<?> addDeviceToClinic(DeviceTO deviceTO);

    ResponseEntity<?> addEditMedServiceGroup(MedServiceGroupTO to);

    List<SimpleTO> groupList(Long organizationId);

    DeviceTO getClinicDevice(Long clinicDeviceId);

    ResponseEntity<?> editDeviceToClinic(DeviceTO device);

    List<SimpleTO> devices();
}
