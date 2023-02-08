package com.lissoft.dao;

import com.lissoft.entity.MedServiceItem;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface MedServiceItemDao extends Dao<MedServiceItem> {
    List<MedServiceItem> getList(Long analyseId);

}
