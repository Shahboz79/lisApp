package com.lissoft.services.impl;

import com.google.gson.Gson;
import com.lissoft.dao.*;
import com.lissoft.entity.MedService;
import com.lissoft.entity.MedServiceGroup;
import com.lissoft.entity.MedServiceItem;
import com.lissoft.entity.Organization;
import com.lissoft.services.ClinicService;
import com.lissoft.to.http.MessageResponse;
import com.lissoft.to.OrganizationTO;
import com.lissoft.to.http.HttpResponse;
import com.lissoft.to.http.MedServiceFieldResponse;
import com.lissoft.to.http.MedServiceGroupResponse;
import com.lissoft.to.http.MedServiceResponse;
import com.lissoft.utils.HttpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service(value = "clinicService")
public class ClinicServiceImpl extends BaseService implements ClinicService {

    private final ClinicRepository clinicRepository;
    private final MedServiceDao medServiceDao;
    private final MedServiceItemDao medServiceItemDao;
    private final MedServiceGroupDao medServiceGroupDao;
    private final ClinicDeviceRepository clinicDeviceRepository;

    @Override
    public List<OrganizationTO> list() {
        return clinicRepository.findAll().stream().map(Organization::toTO).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> addEdit(OrganizationTO to) {
        try {
            Optional<Organization> clinic = Optional.of(new Organization());
            if (to.getId() != null) {
                clinic = clinicRepository.getClinicByTechnoMedIdAndDeletedIsFalse(to.getId());
            }
            if (clinic.isEmpty()) {
                clinic = Optional.of(new Organization());
                clinic.get().setTechnoMedId(to.getId());
            }
            clinic.get().setName(to.getName());
            clinic.get().setFullName(to.getFullName());
            clinic.get().setOblastId(to.getOblastId());
            clinic.get().setRegionId(to.getRegionId());
            clinic.get().setZipCode(to.getZipCode());
            clinic.get().setAddress(to.getAddress());
            clinic.get().setContactInfo(to.getContactInfo());
            clinic.get().setDirector(to.getDirector());
            clinicRepository.save(clinic.get());
            return ResponseEntity.ok(to);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Xatolik");
        }
    }

    @Override
    public ResponseEntity<?> block(OrganizationTO to) {
        Optional<Organization> clinic = clinicRepository.getClinicByTechnoMedIdAndDeletedIsFalse(to.getId());
        if (clinic.isPresent()) {
            clinic.get().setBlocked(to.getBlocked());
            clinic.get().setUpdatedDate(new Date());
            clinicRepository.save(clinic.get());

            return ResponseEntity.ok(new MessageResponse("\"" + clinic.get().getName() + "\" nomli klinika " + (clinic.get().getBlocked() ? "bloklandi" : "blokdan chiqarildi")));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Klinika topilmadi");
    }

    @Override
    public ResponseEntity<?> medServiceList(Long clinicId) {
        List<MedService> list = medServiceDao.getList(clinicId);
        return ResponseEntity.ok(list.stream().map(MedService::toSimpleTO).collect(Collectors.toList()));
    }

    @Override
    public ResponseEntity<?> synchronizeWithTM(Long organizationId) {
        try {
            //Fetch organization's med service groups list
            HttpResponse<MedServiceGroupResponse> serviceGroups = HttpUtil.getOrgMedicalData(
                    "http://innovatsiya.uz/technomed/IntegrationWebApi/GetAllOrgMedicalServiceGroup?organizationId=" + organizationId);
            if (serviceGroups != null) {
                System.out.println(new Gson().toJson(serviceGroups));
                serviceGroups.getResult().forEach(g->{
                    MedServiceGroup serviceGroup = medServiceGroupDao.getByTechnoMedId(g.getMedicalServiceGroupID());
                    if (serviceGroup == null) {
                        serviceGroup = new MedServiceGroup();
                    }
                    serviceGroup.setName(g.getMedicalServiceGroupName());
                    serviceGroup.setTechnoMedId(g.getMedicalServiceGroupID());
                    medServiceGroupDao.saveOrUpdate(serviceGroup);
                });
//                return ResponseEntity.ok(new MessageResponse("Klinika med xizmatlar guruhlari yuklandi"));
            } /*else {
                return ResponseEntity.unprocessableEntity().body(new MessageResponse("Klinika med xizmatlar guruhlari yuklanmadi"));
            }*/

            //Fetch organization's med services list
            HttpResponse<MedServiceResponse> orgMedicalServiceData = HttpUtil.getOrgMedicalServiceData(
                    "http://innovatsiya.uz/technomed/IntegrationWebApi/GetAllOrgMedicalService?organizationId=" + organizationId);
            if (orgMedicalServiceData != null) {
                orgMedicalServiceData.getResult().forEach(g->{
                    MedService medService = medServiceDao.getByTechnoMedId(g.getMedicalServiceID());
                    if (medService == null) {
                        medService = new MedService();
                        medService.setMedServiceGroup(medServiceGroupDao.getByTechnoMedId(Long.valueOf(g.getMedicalServiceGroupID())));
                    }
                    medService.setName(g.getMedicalServiceName());
                    medService.setCode(g.getMedicalServiceCode());
                    medService.setTechnoMedServiceId(g.getMedicalServiceID());
                    medServiceDao.saveOrUpdate(medService);

                    try {
                        HttpResponse<MedServiceFieldResponse> serviceData = HttpUtil.getOrgMedicalServiceFieldsData(
                                "http://innovatsiya.uz/technomed/IntegrationWebApi/GetAllMedicalServiceField?MedicalServiceID=" + medService.getTechnoMedServiceId());
                        if (serviceData != null) {
                            MedService finalMedService = medService;
                            serviceData.getResult().forEach(si->{
                                MedServiceItem serviceItem = new MedServiceItem();
                                serviceItem.setMedService(finalMedService);
                                serviceItem.setName(si.getFieldName());
                                serviceItem.setNorm(si.getFieldValueNorm());
                                serviceItem.setUnit(si.getFieldUnitOfMeasure());
                                serviceItem.setOrderNumber(si.getOrderNumber());
                                serviceItem.setTechnoMedFieldId(si.getMedicalServiceFieldID());
                                medServiceItemDao.saveOrUpdate(serviceItem);
                            });
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });
                return ResponseEntity.ok(new MessageResponse("Klinika med xizmatlar guruhlari yuklandi"));
            } else {
                return ResponseEntity.unprocessableEntity().body(new MessageResponse("Klinika med xizmatlar guruhlari yuklanmadi"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new MessageResponse("Klinika med xizmatlar guruhlarini yuklashda xatolik"));
        }
    }
}
