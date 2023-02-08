package com.lissoft.dao;

import com.lissoft.entity.Patient;

import java.util.List;

public interface PatientDao extends Dao<Patient> {
    List<Patient> search(String keyword);

    List<Patient> list();

    List<Patient> todaysList();
}
