package com.lissoft.dao.impl;

import com.lissoft.dao.MedServiceDao;
import com.lissoft.entity.MedService;
import com.lissoft.utils.StringUtil;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "medServiceDao")
public class MedServiceDaoImpl extends BaseDaoImpl<MedService> implements MedServiceDao {

    public MedServiceDaoImpl() {
        super(MedService.class);
    }

    @Override
    public List<MedService> getList(Long clinicId) {
        return getEntityManager().createQuery("select l from MedService l where l.deleted=false " +
                        (clinicId != null && clinicId > 0L ? "and l.organization.id=" + clinicId : "") +
                "order by l.name asc").getResultList();
    }

    @Override
    public List<MedService> search(String keyword) {
        return getEntityManager().createQuery("select p from MedService p where p.deleted=false and " +
                " lower(p.name) like :keyword ")
                .setParameter("keyword", StringUtil.cleanPhoneNumber("%" + keyword.toLowerCase() + "%"))
                .getResultList();
    }

    @Override
    public MedService getByTechnoMedId(Long technoMedServiceID) {
        List resultList = getEntityManager().createQuery("select s from MedService s where s.deleted=false and s.technoMedServiceId=:technoMedServiceID order by s.id desc")
                .setParameter("technoMedServiceID", technoMedServiceID)
                .getResultList();
        return !resultList.isEmpty() ? (MedService) resultList.get(0) : null;
    }
}
