package com.lissoft.dao.impl;

import com.lissoft.dao.MedServiceItemDao;
import com.lissoft.entity.MedServiceItem;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "laboratoryItemDao")
public class MedServiceItemDaoImpl extends BaseDaoImpl<MedServiceItem> implements MedServiceItemDao {
    public MedServiceItemDaoImpl() {
        super(MedServiceItem.class);
    }

    @Override
    public List<MedServiceItem> getList(Long analyseId) {
        return getEntityManager().createQuery("select l from MedServiceItem l where l.deleted=false and l.medService.id=:analyseId")
                .setParameter("analyseId", analyseId)
                .getResultList();
    }


}
