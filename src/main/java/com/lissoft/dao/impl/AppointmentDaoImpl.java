package com.lissoft.dao.impl;

import com.lissoft.dao.AppointmentDao;
import com.lissoft.entity.Appointment;
import com.lissoft.utils.DateUtil;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository(value = "appointmentDao")
public class AppointmentDaoImpl extends BaseDaoImpl<Appointment> implements AppointmentDao {
    public AppointmentDaoImpl() {
        super(Appointment.class);
    }

    @Override
    public List<Appointment> getList() {
        return getEntityManager().createQuery("select a from Appointment a where a.deleted=false order by a.id desc").getResultList();
    }

    @Override
    public List<Appointment> getList(Long startDate, Long endDate) {
        return getEntityManager().createQuery("select a from Appointment a where a.deleted=false " +
                "and a.createdDate between :startDate and : endDate order by a.id desc")
                .setParameter("startDate", DateUtil.getDayStart(new Date(startDate)))
                .setParameter("endDate", DateUtil.getDayStart(new Date(endDate)))
                .getResultList();
    }

    @Override
    public Integer getPatientAppointmentId(Long patientId) {
        List resultList = getEntityManager().createQuery("select a.id from Appointment a where a.deleted=false and a.patient.id=:patientId order by a.id desc")
                .setParameter("patientId", patientId)
                .getResultList();
        return resultList != null && !resultList.isEmpty() ? (Integer) resultList.get(0) : null;
    }

    @Override
    public Appointment getPatientAppointment(Long patientId) {
        List resultList = getEntityManager().createQuery("select a from Appointment a where a.deleted=false and a.patient.id=:patientId")
                .setParameter("patientId", patientId)
                .getResultList();
        return resultList != null && !resultList.isEmpty() ? (Appointment) resultList.get(0) : null;
    }

    @Override
    public List<Appointment> getPatientAppointments(Long patientId, String userRole) {
        boolean isLaboratory = "LABORATORY".equals(userRole);
        return getEntityManager().createQuery("select distinct a from Appointment a" +
                (isLaboratory ? ", AppointmentAnalyze al where a.deleted=false and al.appointment.id=a.id " : " where a.deleted=false ") +
                " and a.patient.id=:patientId order by a.id desc ")
                .setParameter("patientId", patientId)
                .getResultList();
    }

    @Override
    public Appointment getByTechnoMedAppointmentId(Long technoMedAppointmentId) {
        List resultList = getEntityManager().createQuery("select a from Appointment a where a.deleted=false and a.technoMedAppointmentId=:technoMedId")
                .setParameter("technoMedId", technoMedAppointmentId)
                .getResultList();
        return !resultList.isEmpty() ? (Appointment) resultList.get(0) : null;
    }
}
