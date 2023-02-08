package com.lissoft.dao;

import com.lissoft.entity.Appointment;
import com.lissoft.entity.AppointmentAnalyze;
import com.lissoft.entity.Laboratory;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface AppointmentAnalyzeDao extends Dao<AppointmentAnalyze> {

    List<AppointmentAnalyze> getList(Long patientId);

    List<Appointment> getTodaysList();

    Integer getCountByCategory(int year, int month, int categoryId);

    Integer getPersonCountByCategory(int year, int month, int categoryId);

    Integer getAppointmentAmount(Integer appointmentId);

    void deleteByLaboratory(Integer laboratoryId);

    List<Laboratory> getExecutedLaboratories(Integer month);

    List<AppointmentAnalyze> getListByTechnoMedAppointmentId(Long technoMedAppointmentId);

    List<AppointmentAnalyze> getListByTechnoMedAppointmentIdAndDeviceCode(Long technoMedAppointmentId, String deviceCode);
}
