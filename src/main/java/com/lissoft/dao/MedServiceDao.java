package com.lissoft.dao;

import com.lissoft.entity.MedService;

import java.util.List;

public interface MedServiceDao extends Dao<MedService> {

    List<MedService> getList(Long clinicId);

    List<MedService> search(String keyword);

    MedService getByTechnoMedId(Long technoMedServiceID);
}
