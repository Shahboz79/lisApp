package com.lissoft.services.impl;

import com.lissoft.dao.*;
import com.lissoft.entity.Appointment;
import com.lissoft.entity.AppointmentAnalyze;
import com.lissoft.entity.AppointmentAnalyzeItem;
import com.lissoft.entity.Patient;
import com.lissoft.services.PatientService;
import com.lissoft.to.*;
import com.lissoft.to.http.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service(value = "patientService")
public class PatientServiceImpl extends BaseService implements PatientService {

    private final PatientDao patientDao;
    private final AppointmentDao appointmentDao;
    private final MedServiceItemDao medServiceItemDao;
    private final AppointmentAnalyzeDao appointmentAnalyzeDao;
    private final AppointmentAnalyzeItemDao appointmentAnalyzeItemDao;


    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public ResponseEntity<MessageResponse> add(PatientTO to) {
        try {
            Patient patient = new Patient();
            patient.setLastName(to.getLast_name());
            patient.setFirstName(to.getFirst_name());
            patient.setMiddleName(to.getMiddle_name());
            patient.setPhoneNumber(to.getCellphone());
            patient.setBirthDate(to.getBirthdate());
            patient.setEmail(to.getEmail());
            patient.setSex(to.getSex());
            patientDao.saveOrUpdate(patient);

            return ResponseEntity.ok(new MessageResponse("Бемор маълумоти сақланди", patient.getId()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new MessageResponse("Бемор маълумотини сақлашда хатолик"));
        }
    }

    @Override
    public List<PatientTO> search(String keyword) {
        List<Patient> patients = patientDao.search(keyword);
        if (patients != null && !patients.isEmpty()) {
            return patients.stream().map(Patient::toTO).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public List<PatientTO> todaysList() {
        List<Patient> patients = patientDao.todaysList();
        if (patients != null && !patients.isEmpty()) {
            List<PatientTO> result = new ArrayList<>(patients.size());
            patients.forEach(p->result.add(p.toTO()));
            return result;
        }
        return null;
    }

    @Override
    public PatientTO get(Long id) {
        Patient patient = patientDao.get(id);
        if (patient != null) {
            return patient.toTO();
        }
        return null;
    }

    @Override
    public List<AnalyzeItemTO> getLaboratory(Long laboratoryId) {
        List<AppointmentAnalyzeItem> list = appointmentAnalyzeItemDao.getList(laboratoryId);
        List<AnalyzeItemTO> result = new ArrayList<>(list.size());
        list.forEach(a->{
            AnalyzeItemTO analyzeItemTO = a.toTO();
            analyzeItemTO.setUnit(a.getMedServiceItem().getUnit());
            analyzeItemTO.setName(a.getMedServiceItem().getName());
            analyzeItemTO.setNorm(a.getMedServiceItem().getNorm());
            result.add(analyzeItemTO);
        });
        return result;
    }

    @Override
    public AppointmentAnalyzeTO getLaboratoryResult(Long technoMedAppointmentId) {
        Appointment appointment = appointmentDao.getByTechnoMedAppointmentId(technoMedAppointmentId);
        List<AppointmentAnalyze> appointmentAnalyzes = appointmentAnalyzeDao.getListByTechnoMedAppointmentId(technoMedAppointmentId);
        AppointmentAnalyzeTO result = new AppointmentAnalyzeTO(new OrderTO(appointment.getTechnoMedAppointmentId(), appointment.getNum(),
                null, appointment.getOrganization().getId()), appointment.getPatient().toTO(), new ArrayList<>());
        List<AnalyzeItemTO> resList = new ArrayList<>();
        appointmentAnalyzes.forEach(a->{
            AnalyzeItemTO resTO = new AnalyzeItemTO();
            resTO.setId(a.getMedService().getTechnoMedServiceId());
            resTO.setName(a.getMedService().getName());
            resList.add(resTO);

            List<AppointmentAnalyzeItem> items = appointmentAnalyzeItemDao.getList(a.getId());
            if (a.getMedService().getMultiParam()) {
                for (AppointmentAnalyzeItem li : items) {
                    AnalyzeItemTO param = new AnalyzeItemTO();
                    param = getAnalyzeItemTO(li, param);
                    resTO.getParams().add(param);
                }
            } else if (items.size() == 1) {
                AppointmentAnalyzeItem li = items.get(0);
                getAnalyzeItemTO(li, resTO);
            }
        });
        result.setTests(resList);
        return result;
    }

    private static AnalyzeItemTO getAnalyzeItemTO(AppointmentAnalyzeItem li, AnalyzeItemTO param) {
        param.setId(li.getMedServiceItem().getTechnoMedFieldId());
        param.setName(li.getMedServiceItem().getName());
        param.setUnit(li.getMedServiceItem().getUnit());
        param.setNorm(li.getMedServiceItem().getNorm() != null ? li.getMedServiceItem().getNorm() : "");
        return param;
    }

    @Override
    public List<PatientTO> getPatientList() {
        List<Patient> list = patientDao.list();
        List<PatientTO> result = new ArrayList<>();
        list.forEach(p->{result.add(p.toTO());});
        return result;
    }
}
