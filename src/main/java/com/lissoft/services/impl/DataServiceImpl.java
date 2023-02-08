package com.lissoft.services.impl;

import com.lissoft.dao.AppointmentAnalyzeDao;
import com.lissoft.dao.AppointmentAnalyzeItemDao;
import com.lissoft.dao.AppointmentDao;
import com.lissoft.dao.MedServiceItemDao;
import com.lissoft.entity.Appointment;
import com.lissoft.entity.AppointmentAnalyze;
import com.lissoft.entity.AppointmentAnalyzeItem;
import com.lissoft.entity.MedServiceItem;
import com.lissoft.services.DataService;
import com.lissoft.to.ComDataTO;
import com.lissoft.to.http.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
@RequiredArgsConstructor
@Transactional
@Service(value = "dataService")
public class DataServiceImpl extends BaseService implements DataService {
    AppointmentDao appointmentDao;
    AppointmentAnalyzeDao appointmentAnalyzeDao;
    AppointmentAnalyzeItemDao appointmentAnalyzeItemDao;

    MedServiceItemDao medServiceItemDao;

    @Override
    public ResponseEntity<?> addMochaData(List<ComDataTO> to) {
        AtomicReference<Long> appointmentId = new AtomicReference<>();
        to.forEach(d->{
            if ("ID:".equals(d.getFieldName())) {
                appointmentId.set(Long.valueOf(d.getFieldValue()));
            }
        });
        to.forEach(d-> {
            if (d.getFieldName() != null) {
                AppointmentAnalyzeItem item = appointmentAnalyzeItemDao.getByParam(appointmentId.get(), d.getFieldName().trim());
                if (item != null) {
                    item.setResult(d.getFieldValue().trim());
                    item.setResultDate(new Date());
                    appointmentAnalyzeItemDao.saveOrUpdate(item);
                }
            }
        });
        return ResponseEntity.ok(new MessageResponse("Ma'lumot saqlandi"));
    }

    @Override
    public ResponseEntity<?> readAddFile(String fileUrl) {

        File file = new File("src/main/resources/data.txt");

        try (InputStream in = new FileInputStream(file))
        {
            String contents = IOUtils.toString(in, StandardCharsets.UTF_8);
            String[] parts = contents.split("-");

            String numberOnly = parts[1].replaceAll("[^0-9]", "");

            Appointment appointment = appointmentDao.getByTechnoMedAppointmentId(Long.valueOf(numberOnly));

            List<AppointmentAnalyze> appointmentAnalyzes = appointmentAnalyzeDao.getListByTechnoMedAppointmentId(appointment.getId());
            for (AppointmentAnalyze appointmentAnalyze : appointmentAnalyzes) {
            List<MedServiceItem> medServiceItems=   medServiceItemDao.getList(appointmentAnalyze.getMedService().getId());
                for (MedServiceItem medServiceItem : medServiceItems) {
                    for (int i = 2; i < parts.length-1; i++) {
                        String part = parts[i].replaceAll("[^a-zA-Z]", "");
                        if (medServiceItem.getDeviceCode().equals(part)){
                            AppointmentAnalyzeItem appointmentAnalyzeItem =
                                    appointmentAnalyzeItemDao.getByTechnoMedId(medServiceItem.getTechnoMedFieldId(), appointment.getTechnoMedAppointmentId());
                           appointmentAnalyzeItem.setResult(parts[i+1].replaceAll("[^0-9]", ""));
                           appointmentAnalyzeItemDao.update(appointmentAnalyzeItem);
                        }
                    }
                }

            }
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(new MessageResponse("Analiz natijalari saqlandi"));
    }
}
