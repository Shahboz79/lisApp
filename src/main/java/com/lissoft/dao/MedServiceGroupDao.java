package com.lissoft.dao;

import com.lissoft.entity.MedServiceGroup;

import java.util.List;

public interface MedServiceGroupDao extends Dao<MedServiceGroup> {

    List<MedServiceGroup> getList(Long clinicId);

    List<MedServiceGroup> search(String keyword);

    MedServiceGroup getByTechnoMedId(Long technoMedId);
}
