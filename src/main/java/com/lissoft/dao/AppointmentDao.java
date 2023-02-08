package com.lissoft.dao;

import com.lissoft.entity.Appointment;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface AppointmentDao extends Dao<Appointment> {
    List<Appointment> getList();
    List<Appointment> getList(Long startDate, Long endDate);

    Integer getPatientAppointmentId(Long patientId);

    Appointment getPatientAppointment(Long patientId);

    List<Appointment> getPatientAppointments(Long patientId, String userRole);

    Appointment getByTechnoMedAppointmentId(Long technoMedAppointmentId);
}
