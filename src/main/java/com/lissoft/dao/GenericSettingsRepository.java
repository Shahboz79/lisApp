package com.lissoft.dao;

import com.lissoft.entity.GenericSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenericSettingsRepository extends JpaRepository<GenericSettings, Long> {
}