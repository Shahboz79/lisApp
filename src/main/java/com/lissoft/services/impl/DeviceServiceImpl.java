package com.lissoft.services.impl;

import com.lissoft.Constants;
import com.lissoft.dao.ClinicDeviceRepository;
import com.lissoft.entity.ClinicDevice;
import com.lissoft.fetcher.AccessReader;
import com.lissoft.services.DeviceService;
import com.lissoft.to.AccessFileTo;

import com.lissoft.to.access.SyncTO;
import com.lissoft.to.http.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeviceServiceImpl implements DeviceService, Constants {

    private final ClinicDeviceRepository clinicDeviceRepository;
    @Override
    public ResponseEntity<?> syncData(SyncTO syncTO) {
        ClinicDevice clinicDevice = clinicDeviceRepository.getByDeviceId(syncTO.getDeviceId());
        if (clinicDevice != null) {
            switch (clinicDevice.getHandlerCode()) {
                case ST200_BLOOD_ANALYZER: {

                } break;
            }
        }
        return null;
    }

    @Override
    public MessageResponse inputAccessFile(AccessFileTo accessFileTo) {

            Optional<ClinicDevice> clinicDevice = clinicDeviceRepository.findById(accessFileTo.getClinicDeviceId());
            if (clinicDevice.isPresent()) {
                ClinicDevice changeClinicDevice = clinicDevice.get();
                changeClinicDevice.setResultFileName(accessFileTo.getPathFile());
                changeClinicDevice.setResultFilePassword(accessFileTo.getPasswordFile());
                clinicDeviceRepository.save(changeClinicDevice);
                return new MessageResponse("ClinicDevicega fayl kiritildi");
            } else {
                return new MessageResponse("ClinicDevice topilmadi");
            }
        }
    }
