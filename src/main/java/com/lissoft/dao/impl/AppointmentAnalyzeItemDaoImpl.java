package com.lissoft.dao.impl;

import com.lissoft.dao.AppointmentAnalyzeItemDao;
import com.lissoft.entity.AppointmentAnalyzeItem;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "appointmentLaboratoryItemDao")
public class AppointmentAnalyzeItemDaoImpl extends BaseDaoImpl<AppointmentAnalyzeItem> implements AppointmentAnalyzeItemDao {
    public AppointmentAnalyzeItemDaoImpl() {
        super(AppointmentAnalyzeItem.class);
    }

    @Override
    public List<AppointmentAnalyzeItem> getList(Long appointmentLaboratoryId) {
        return getEntityManager().createQuery("select a from AppointmentAnalyzeItem a where a.deleted=false and " +
                "a.appointmentAnalyze.id=:appointmentLaboratoryId order by a.id desc")
                .setParameter("appointmentLaboratoryId", appointmentLaboratoryId)
                .getResultList();
    }

    @Override
    public AppointmentAnalyzeItem getItem(Long appointmentLaboratoryId) {
        List resultList = getEntityManager().createQuery("select a from AppointmentAnalyzeItem a where a.deleted=false and " +
                "a.appointmentAnalyze.id=:appointmentLaboratoryId order by a.id desc")
                .setParameter("appointmentLaboratoryId", appointmentLaboratoryId)
                .getResultList();
        return resultList != null && !resultList.isEmpty() ? (AppointmentAnalyzeItem) resultList.get(0) : null;
    }

    @Override
    public AppointmentAnalyzeItem getItem(Long appointmentLaboratoryId, Long laboratoryItemId) {
        List resultList = getEntityManager().createQuery("select a from AppointmentAnalyzeItem a where a.deleted=false and " +
                "a.appointmentAnalyze.id=:appointmentLaboratoryId and a.medServiceItem.id=:laboratoryItemId order by a.id desc")
                .setParameter("appointmentLaboratoryId", appointmentLaboratoryId)
                .setParameter("laboratoryItemId", laboratoryItemId)
                .getResultList();
        return resultList != null && !resultList.isEmpty() ? (AppointmentAnalyzeItem) resultList.get(0) : null;
    }

    @Override
    public List<AppointmentAnalyzeItem> getListByDevice(Long appointmentId, String deviceCode) {
        return getEntityManager().createQuery("select a from AppointmentAnalyzeItem a where a.deleted=false and " +
                "a.appointmentAnalyze.appointment.id=:appointmentId and a.medServiceItem.deviceCode=:deviceCode order by a.id desc")
                .setParameter("appointmentId", appointmentId)
                .setParameter("deviceCode", deviceCode)
                .getResultList();
    }

    @Override
    public AppointmentAnalyzeItem getByHostCode(Long appointmentId, String hostCode) {
        List resultList = getEntityManager().createQuery("select a from AppointmentAnalyzeItem a where a.deleted=false and " +
                "a.appointmentAnalyze.appointment.id=:appointmentId and a.medServiceItem.hostCode=:hostCode order by a.id desc")
                .setParameter("appointmentId", appointmentId)
                .setParameter("hostCode", hostCode)
                .getResultList();
        return !resultList.isEmpty() ? (AppointmentAnalyzeItem) resultList.get(0) : null;
    }

    @Override
    public AppointmentAnalyzeItem getByTechnoMedId(Long technoMedAppointmentId, Long technoMedMedServiceItemId) {
        List resultList = getEntityManager().createQuery("select a from AppointmentAnalyzeItem a where a.deleted=false and " +
                        "a.medServiceItem.technoMedFieldId=:technoMedMedServiceItemId and " +
                        "a.appointmentAnalyze.appointment.technoMedAppointmentId=:technoMedAppointmentId order by a.id desc")
                .setParameter("technoMedAppointmentId", technoMedAppointmentId)
                .setParameter("technoMedMedServiceItemId", technoMedMedServiceItemId)
                .getResultList();
        return !resultList.isEmpty() ? (AppointmentAnalyzeItem) resultList.get(0) : null;
    }



    @Override
    public AppointmentAnalyzeItem getByParam(Long appointmentLaboratoryId, String paramName) {
        List resultList = getEntityManager().createQuery("select a from AppointmentAnalyzeItem a where a.deleted=false and " +
                        "a.appointmentAnalyze.id=:appointmentLaboratoryId and a.medServiceItem.name=:analyzeItemName order by a.id desc")
                .setParameter("appointmentLaboratoryId", appointmentLaboratoryId)
                .setParameter("analyzeItemName", paramName)
                .getResultList();
        return !resultList.isEmpty() ? (AppointmentAnalyzeItem) resultList.get(0) : null;
    }
}
