package com.lissoft.services.impl;

import com.lissoft.dao.*;
//import com.lissoft.entity.*;
import com.lissoft.entity.ClinicDevice;
import com.lissoft.entity.Device;
import com.lissoft.entity.MedService;
import com.lissoft.entity.MedServiceGroup;
import com.lissoft.services.MedServicesService;
import com.lissoft.to.*;
import com.lissoft.to.http.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service(value = "medServicesService")
public class MedServicesServiceImpl extends BaseService implements MedServicesService {

    private final ClinicRepository clinicRepository;
    private final MedServiceDao medServiceDao;
    private final MedServiceGroupDao medServiceGroupDao;
    private final ClinicDeviceRepository clinicDeviceRepository;
    private final DeviceRepository deviceRepository;
    private final MedServiceItemDao medServiceItemDao;

    @Override
    public List<SimpleTO> list(Long organizationId) {
        return medServiceDao.getList(organizationId).stream().map(MedService::toSimpleTO).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> addEditMedService(LaboratoryTO to) {
        try {
            MedService medService = new MedService();
            if (to.getMedService() != null && to.getMedService().getId() != null) {
                MedService search = medServiceDao.get(to.getMedService().getId());
                if (search != null) {
                    medService = search;
                }
            } else {
                return ResponseEntity.unprocessableEntity().body(new MessageResponse("Gruppa ID raqamini yuboring"));
            }

            medService.setName(to.getName());
            medService.setCode(to.getCode());
            medService.setTechnoMedServiceId(to.getMedService().getId());
            medService.setMedServiceGroup(medServiceGroupDao.get(to.getMedServiceGroup().getId()));
            medService.setOrganization(medService.getMedServiceGroup().getOrganization());
            medServiceDao.saveOrUpdate(medService);
            return ResponseEntity.ok(new MessageResponse("Klinikaga med xizmat qo`shildi", medService.getId()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new MessageResponse("Xatolik"));
        }
    }

    @Override
    public ResponseEntity<LaboratoryTO> get(Long id) {
        MedService medService = medServiceDao.get(id);
        if (medService != null) {
            LaboratoryTO to = new LaboratoryTO();
            to.setId(medService.getId());
            to.setName(medService.getName());
            to.setParams(medServiceItemDao.getList(id).stream().map(ai-> new AnalyzeItemTO(ai.getId(), ai.getName(), ai.getUnit(), ai.getNorm())).toList());
            return ResponseEntity.ok(to);
        }
        return null;
    }

    @Override
    public List<DeviceTO> deviceList(Long organizationId) {
        List<ClinicDevice> list = clinicDeviceRepository.findAllByOrganization_IdAndDeletedIsFalseOrderByDevice_DeviceNameAsc(organizationId);
        return list.stream().map(ClinicDevice::toTO).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> addDevice(SimpleTO device) {
        Device newDevice = new Device();
        newDevice.setDeviceName(device.getName());
        deviceRepository.save(newDevice);
        return ResponseEntity.ok(new MessageResponse("Apparat ma'lumoti saqlandi"));
    }

    @Override
    public ResponseEntity<?> addDeviceToClinic(DeviceTO deviceTO) {
        try {
            ClinicDevice clinicDevice = new ClinicDevice();
            clinicDevice.setOrganization(clinicRepository.getReferenceById(deviceTO.getOrganization().getId()));
            clinicDevice.setDevice(deviceRepository.findById(deviceTO.getId()).get());
            clinicDeviceRepository.save(clinicDevice);
            return ResponseEntity.ok(new MessageResponse("Apparat klinikaga qo`shildi"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Apparatni klinikaga qo`shishda xatolik"));
        }
    }

    @Override
    public ResponseEntity<?> addEditMedServiceGroup(MedServiceGroupTO to) {
        try {
            MedServiceGroup group = medServiceGroupDao.getByTechnoMedId(to.getId());
            if (group == null) {
                group = new MedServiceGroup();
                group.setOrganization(clinicRepository.getClinicByTechnoMedIdAndDeletedIsFalse(to.getOrganization().getId()).get());
            }
            group.setName(to.getName());
            medServiceGroupDao.saveOrUpdate(group);
            return ResponseEntity.ok(new MessageResponse("Klinikaga yangi gruppa qo`shildi"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new MessageResponse("Klinikaga yangi gruppa qo`shishda xatolik"));
        }
    }

    @Override
    public List<SimpleTO> groupList(Long organizationId) {
        return medServiceGroupDao.getList(organizationId).stream().map(MedServiceGroup::toSimpleTO).collect(Collectors.toList());
    }

    @Override
    public DeviceTO getClinicDevice(Long clinicDeviceId) {
        Optional<ClinicDevice> clinicDevice = clinicDeviceRepository.findById(clinicDeviceId);
        if (clinicDevice.isPresent()){
            return clinicDevice.get().toTO();
        }
        return null;
    }

    @Override
    public ResponseEntity<?> editDeviceToClinic(DeviceTO device) {
        Optional<ClinicDevice> clinicDevice = clinicDeviceRepository.findById(device.getId());
        if (clinicDevice.isPresent()){
            ClinicDevice editClinicDevice= clinicDevice.get();
            editClinicDevice.setIpAddress(device.getIpAddress());
            editClinicDevice.setDeviceName(device.getDeviceName());
            editClinicDevice.setPortNumber(device.getPortNumber());
            clinicDeviceRepository.save(editClinicDevice);
            return ResponseEntity.status(200).body(new MessageResponse("Muvaffaqiyatli o'zagartirildi"));
        }
        return ResponseEntity.status(409).body(new MessageResponse("Error"));
    }

    @Override
    public List<SimpleTO> devices() {
        List<Device> devices = deviceRepository.findAll();
        List<SimpleTO> deviceList=new ArrayList<>();
        for (Device device : devices) {
               deviceList.add(new SimpleTO(device.getId(),device.getDeviceName()));
        }
        return deviceList;
    }
}
