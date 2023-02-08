package com.lissoft.dao.impl;

import com.lissoft.dao.MedServiceGroupDao;
import com.lissoft.entity.MedServiceGroup;
import com.lissoft.utils.StringUtil;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "medServiceGroupDao")
public class MedServiceGroupDaoImpl extends BaseDaoImpl<MedServiceGroup> implements MedServiceGroupDao {

    public MedServiceGroupDaoImpl() {
        super(MedServiceGroup.class);
    }

    @Override
    public List<MedServiceGroup> getList(Long organizationId) {
        return getEntityManager().createQuery("select l from MedServiceGroup l where l.deleted=false " +
                        (organizationId != null && organizationId > 0L ? "and l.organization.id=" + organizationId : "") +
                "order by l.name asc").getResultList();
    }

    @Override
    public List<MedServiceGroup> search(String keyword) {
        return getEntityManager().createQuery("select p from MedServiceGroup p where p.deleted=false and " +
                " lower(p.name) like :keyword ")
                .setParameter("keyword", StringUtil.cleanPhoneNumber("%" + keyword.toLowerCase() + "%"))
                .getResultList();
    }

    @Override
    public MedServiceGroup getByTechnoMedId(Long technoMedId) {
        List resultList = getEntityManager().createQuery("select g from MedServiceGroup g where g.deleted=false and g.technoMedId=:technoMedId")
                .setParameter("technoMedId", technoMedId)
                .getResultList();
        return !resultList.isEmpty() ? (MedServiceGroup) resultList.get(0) : null;
    }
}
