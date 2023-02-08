package com.lissoft.dao.impl;

import com.lissoft.dao.PatientDao;
import com.lissoft.entity.Patient;
import com.lissoft.utils.DateUtil;
import com.lissoft.utils.StringUtil;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import java.util.Date;
import java.util.List;

@Repository(value = "patientDao")
public class PatientDaoImpl extends BaseDaoImpl<Patient> implements PatientDao  {
    public PatientDaoImpl() {
        super(Patient.class);
    }

    @Override
    public List<Patient> search(String keyword) {
        return getEntityManager().createQuery("select p from Patient p where p.deleted=false and " +
                "(lower(p.lastName) like :keyword or lower(p.firstName) like :keyword or p.phoneNumber like :keyword or lower(p.passportNumber) like :keyword)")
                .setParameter("keyword", StringUtil.cleanPhoneNumber("%" + keyword.toLowerCase() + "%"))
                .getResultList();
    }

    @Override
    public List<Patient> list() {
        Query query = getEntityManager().createQuery("select p from Patient p " +
                "where p.deleted=false " +
        "order by p.id desc");
        return query.getResultList();
    }

    @Override
    public List<Patient> todaysList() {
        return getEntityManager().createQuery("select p from Patient p where p.deleted=false and p.createdDate between :startDate and :endDate " +
                        "order by p.id desc")
                .setParameter("startDate", DateUtil.getDayStart(new Date()))
                .setParameter("endDate", DateUtil.getDayEnd(new Date()))
                .getResultList();
    }
}
