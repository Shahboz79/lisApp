package com.lissoft.dao;

import com.lissoft.entity.AppointmentAnalyzeItem;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface AppointmentAnalyzeItemDao extends Dao<AppointmentAnalyzeItem> {

    List<AppointmentAnalyzeItem> getList(Long appointmentLaboratoryId);

    AppointmentAnalyzeItem getItem(Long appointmentLaboratoryId);

    AppointmentAnalyzeItem getItem(Long appointmentLaboratoryId, Long laboratoryItemId);

    List<AppointmentAnalyzeItem> getListByDevice(Long appointmentId, String deviceCode);

    AppointmentAnalyzeItem getByHostCode(Long appointmentId, String hostCode);

    AppointmentAnalyzeItem getByTechnoMedId(Long technoMedAppointmentId, Long technoMedMedServiceItemId);


    AppointmentAnalyzeItem getByParam(Long appointmentLaboratoryId, String paramName);


}
