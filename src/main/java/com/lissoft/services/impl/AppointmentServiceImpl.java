package com.lissoft.services.impl;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code128Writer;
import com.lissoft.dao.*;
import com.lissoft.entity.*;
import com.lissoft.to.*;
import com.lissoft.entity.*;
import com.lissoft.services.AppointmentService;
import com.lissoft.to.http.MessageResponse;
import com.lissoft.utils.StringUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.font.FontRenderContext;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service(value = "appointmentService")
public class AppointmentServiceImpl extends BaseService implements AppointmentService {

    private final AppointmentDao appointmentDao;
    private final PatientDao patientDao;
    private final ClinicRepository clinicRepository;
    private final MedServiceDao medServiceDao;
    private final MedServiceItemDao medServiceItemDao;
    private final AppointmentAnalyzeDao appointmentAnalyzeDao;
    private final AppointmentAnalyzeItemDao appointmentAnalyzeItemDao;


    @Override
    public ResponseEntity<?> addAnalyzesToPatient(AppointmentAnalyzeTO laboratoryTO) {
        try {
            Patient patient = new Patient();
            if (laboratoryTO.getPatient().getId() != null && laboratoryTO.getPatient().getId() > 0L) {
                Patient patient1 = patientDao.get(laboratoryTO.getPatient().getId());
                if (patient1 != null) {
                    patient = patient1;
                } else {
                    patient.fromTO(laboratoryTO.getPatient());
                    patientDao.saveOrUpdate(patient);
                }
            } else {
                patient.fromTO(laboratoryTO.getPatient());
                patientDao.saveOrUpdate(patient);
            }

            Appointment appointment = new Appointment();
            appointment.setTechnoMedAppointmentId(laboratoryTO.getOrder().getId());
            appointment.setNum(laboratoryTO.getOrder().getNum());
            appointment.setPatient(patient);
            appointment.setOrganization(clinicRepository.getClinicByTechnoMedIdAndDeletedIsFalse(laboratoryTO.getOrder().getOrganizationID()).get());
            appointmentDao.saveOrUpdate(appointment);

            if (laboratoryTO.getTests() != null && !laboratoryTO.getTests().isEmpty()) {
                for (AnalyzeItemTO itemTO : laboratoryTO.getTests()) {
                    AppointmentAnalyze appointmentAnalyze = new AppointmentAnalyze();
                    appointmentAnalyze.setAppointment(appointment);
                    appointmentAnalyze.setMedService(medServiceDao.getByTechnoMedId(itemTO.getId()));
                    appointmentAnalyzeDao.saveOrUpdate(appointmentAnalyze);

                    List<MedServiceItem> list = medServiceItemDao.getList(appointmentAnalyze.getMedService().getId());
                    if (list != null) {
                        for (MedServiceItem item : list) {
                            AppointmentAnalyzeItem laboratoryItem = new AppointmentAnalyzeItem();
                            laboratoryItem.setMedServiceItem(item);
                            laboratoryItem.setAppointmentAnalyze(appointmentAnalyze);
                            appointmentAnalyzeItemDao.create(laboratoryItem);
                        }
                    }
                }
            }
            return ResponseEntity.ok(new MessageResponse("Bemorga tahlil qo`shildi", appointment.getId()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new MessageResponse("Bemorga tahlil qo`shildi"));
        }
    }

    @Override
    public ResponseEntity<?> list(Long startDate, Long endDate) {
        List<Appointment> list = appointmentDao.getList(startDate, endDate);
        if (list != null) {
            List<AppointmentAnalyzeTO> result = new ArrayList<>(list.size());
            list.forEach(a -> result.add(new AppointmentAnalyzeTO(new OrderTO(a.getTechnoMedAppointmentId(), a.getNum(), null, null),
                    a.getPatient().toTO(), getAnalyseItems(a.getTechnoMedAppointmentId()))));
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.internalServerError().body(new MessageResponse("Xatolik"));
    }

    private List<AnalyzeItemTO> getAnalyseItems(Long technoMedAppointmentId) {
        List<AppointmentAnalyze> list = appointmentAnalyzeDao.getListByTechnoMedAppointmentId(technoMedAppointmentId);
        List<AnalyzeItemTO> result = new ArrayList<>(list.size());
        list.forEach(ai -> {
            result.add(new AnalyzeItemTO(ai.getMedService().getId(), ai.getMedService().getName()));
        });
        return result;
    }

    @Override
    public List<PatientTO> getListForLaboratory() {
        List<Appointment> list = appointmentAnalyzeDao.getTodaysList();
        if (list != null) {
            List<PatientTO> result = new ArrayList<>(list.size());
            list.forEach(al -> {
                Patient patient = al.getPatient();
                PatientTO to = new PatientTO(al.getId(), patient.getLastName(), patient.getFirstName(), patient.getMiddleName(),
                        patient.getBirthDate(), patient.getSex(), patient.getPhoneNumber(), patient.getEmail());
                result.add(to);
            });
            return result;
        }
        return new ArrayList<>();
    }

    @Override
    public ResponseEntity<MessageResponse> printBarCode(Long appointmentId) {
        try {
            String codeS = StringUtil.makeZeroLead(appointmentId, 8);
            Code128Writer barcodeWriter = new Code128Writer();
            BitMatrix bitMatrix = barcodeWriter.encode(codeS, BarcodeFormat.CODE_128, 50, 50);
            BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
            Graphics graphics = qrImage.getGraphics();
            Font f = new Font("Arial", Font.PLAIN, 12);
            FontRenderContext frc = qrImage.getGraphics().getFontMetrics().getFontRenderContext();
            Rectangle2D rect = f.getStringBounds(codeS, frc);
            graphics.setColor(Color.WHITE);
            graphics.fillRect(
                    (int) Math.ceil((qrImage.getWidth() / 2) - ((rect.getWidth() + 10) / 2)),
                    (int) Math.ceil(qrImage.getHeight() - 12),
                    (int) Math.ceil(rect.getWidth() + 10),
                    (int) Math.ceil(rect.getHeight()));

            graphics.setFont(f);
            graphics.setColor(Color.BLACK);
            graphics.drawString(codeS,
                    (int) Math.ceil((qrImage.getWidth() / 2) - ((rect.getWidth()) / 2)),
                    (int) Math.ceil(qrImage.getHeight()));
            graphics.dispose();

            FileOutputStream qrCode = new FileOutputStream(StringUtil.getFileUrl() + "laboratory/" + appointmentId + ".png");
            ImageIO.write(qrImage, "png", qrCode);
            qrCode.close();

            return ResponseEntity.ok(new MessageResponse("Штрих код печат қилинди"));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(new MessageResponse("Штрих кодни печат қилишда хатолик"));
        } catch (WriterException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<AnalyzeItemTO> getLaboratoryItemsByDevice(Long technoMedAppointmentId, String deviceCode) {
        List<AppointmentAnalyzeItem> list = appointmentAnalyzeItemDao.getListByDevice(technoMedAppointmentId, deviceCode);
        List<AnalyzeItemTO> items = new ArrayList<>();
        list.forEach(a -> {
            AnalyzeItemTO resTO = new AnalyzeItemTO();
            resTO.setId(a.getId());
            resTO.setName(a.getMedServiceItem().getName());
            resTO.setHostCode(a.getMedServiceItem().getHostCode() != null ? a.getMedServiceItem().getHostCode() : "");
            items.add(resTO);
        });
        return items;
    }

    @Override
    public ResponseEntity<?> saveLaboratoryItemResult(Long appLabItemId, String result) {
        AppointmentAnalyzeItem item = appointmentAnalyzeItemDao.get(appLabItemId);
        if (item != null) {
            item.setResult(result);
            appointmentAnalyzeItemDao.saveOrUpdate(item);

            return ResponseEntity.ok(new MessageResponse("Таҳлил натижаси сақланди"));
        }
        return ResponseEntity.internalServerError().body(new MessageResponse("Таҳлил натижасини сақлашда хатолик"));
    }

    @Override
    public AppointmentAnalyzeItem getAppointmentLaboratoryItem(Long id) {
        return appointmentAnalyzeItemDao.get(id);
    }

    @Override
    public ResponseEntity<?> enterAnalyzesResult(AppointmentAnalyzeTO to) {
        try {
            to.getTests().forEach(a -> {
                if (StringUtils.isNotEmpty(a.getResult())) {
                    AppointmentAnalyzeItem item = appointmentAnalyzeItemDao.getByTechnoMedId(to.getOrder().getId(), a.getId());
                    if (item != null) {
                        item.setResult(a.getResult());
                        item.setResultDate(new Date());
                        appointmentAnalyzeItemDao.saveOrUpdate(item);
                    }
                }
            });
            return ResponseEntity.ok(new MessageResponse("Tahlil natijasi saqlandi"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new MessageResponse("Tahlil natijasi saqlashda xatolik"));
        }
    }

}
