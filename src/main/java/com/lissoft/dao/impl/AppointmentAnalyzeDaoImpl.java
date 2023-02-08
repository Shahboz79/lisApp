package com.lissoft.dao.impl;

import com.lissoft.dao.AppointmentAnalyzeDao;
import com.lissoft.entity.Appointment;
import com.lissoft.entity.AppointmentAnalyze;
import com.lissoft.entity.Laboratory;
import com.lissoft.utils.DateUtil;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository(value = "appointmentLaboratoryDao")
public class AppointmentAnalyzeDaoImpl extends BaseDaoImpl<AppointmentAnalyze> implements AppointmentAnalyzeDao {
    public AppointmentAnalyzeDaoImpl() {
        super(AppointmentAnalyze.class);
    }

    @Override
    public List<AppointmentAnalyze> getList(Long appointmentId) {
        return getEntityManager().createQuery("select a from AppointmentAnalyze a where a.deleted=false and " +
                "a.appointment.id=:appointmentId order by a.id desc")
                .setParameter("appointmentId", appointmentId)
                .getResultList();
    }

    @Override
    public List<Appointment> getTodaysList() {
        return getEntityManager().createQuery("select distinct a.appointment from AppointmentAnalyze a " +
                "where a.deleted=false and a.appointment.createdDate between :startDate and :endDate ")
                .setParameter("startDate", DateUtil.getDayStart(DateUtil.addDays(new Date(), -10)))
                .setParameter("endDate", DateUtil.getDayEnd(new Date()))
                .getResultList();
    }

    @Override
    public Integer getCountByCategory(int year, int month, int categoryId) {
        month -= 1;
        Date dayEnd = DateUtil.getMonthEnd(new Date(year - 1900, month, 1, 0, 0, 0));
        Long result = (Long) getEntityManager().createQuery("select count(al.id) from AppointmentAnalyze al where al.deleted=false " +
                "and al.resultDate between :startDate and :endDate and al.laboratory.categoryId=:categoryId")
                .setParameter("startDate", DateUtil.getDayStart(new Date(year-1900, month, 1, 0, 0, 0)))
                .setParameter("endDate", dayEnd)
                .setParameter("categoryId", categoryId)
                .getSingleResult();
        return result.intValue();
    }

    @Override
    public Integer getPersonCountByCategory(int year, int month, int categoryId) {
        month -= 1;
        Date dayEnd = DateUtil.getMonthEnd(new Date(year - 1900, month, 1, 0, 0, 0));
        List result = getEntityManager().createQuery("select count(al.id) from AppointmentAnalyze al where al.deleted=false " +
                "and al.resultDate between :startDate and :endDate and al.laboratory.categoryId=:categoryId " +
                "group by al.appointment.patient.id ")
                .setParameter("startDate", DateUtil.getDayStart(new Date(year-1900, month, 1, 0, 0, 0)))
                .setParameter("endDate", dayEnd)
                .setParameter("categoryId", categoryId)
                .getResultList();
        return !result.isEmpty() ? ((Long) result.get(0)).intValue() : 0;
    }

    @Override
    public Integer getAppointmentAmount(Integer paymentId) {
        Double fullAmount = (Double) getEntityManager().createQuery("select sum(t.laboratory.price) from AppointmentAnalyze t where t.deleted=false and t.payment.id=:paymentId")
                .setParameter("paymentId", paymentId)
                .getSingleResult();
        return fullAmount != null ? fullAmount.intValue() : 0;
    }

    @Override
    public void deleteByLaboratory(Integer laboratoryId) {
        getEntityManager().createQuery("update AppointmentAnalyze set deleted=true, deletedDate=now() where laboratory.id=:laboratoryId ")
                .setParameter("laboratoryId", laboratoryId).executeUpdate();
    }

    @Override
    public List<Laboratory> getExecutedLaboratories(Integer month) {
        Date date = new Date();
        date.setMonth(month);
        return getEntityManager().createQuery("select al.laboratory from AppointmentAnalyze al where al.deleted=false and " +
                " (al.resultDate between :startDate and :endDate) group by al.laboratory")
                .setParameter("startDate", DateUtil.getMonthStart(date))
                .setParameter("endDate", DateUtil.getMonthEnd(date))
                .getResultList();
    }

    @Override
    public List<AppointmentAnalyze> getListByTechnoMedAppointmentId(Long technoMedAppointmentId) {
        return getEntityManager().createQuery("select aa from AppointmentAnalyze aa where aa.deleted=false and " +
                        "aa.appointment.technoMedAppointmentId=:appointmentId order by aa.id asc ")
                .setParameter("appointmentId", technoMedAppointmentId)
                .getResultList();
    }

    @Override
    public List<AppointmentAnalyze> getListByTechnoMedAppointmentIdAndDeviceCode(Long technoMedAppointmentId, String deviceCode) {
        return getEntityManager().createQuery("select aa from AppointmentAnalyze aa where aa.deleted=false and " +
                        "aa.appointment.technoMedAppointmentId=:appointmentId and aa.medService. order by aa.id asc ")
                .setParameter("appointmentId", technoMedAppointmentId)
                .getResultList();
    }
}
