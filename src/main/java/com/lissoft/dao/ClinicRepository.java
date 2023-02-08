package com.lissoft.dao;

import com.lissoft.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClinicRepository extends JpaRepository<Organization, Long> {
    Optional<Organization> getClinicByTechnoMedIdAndDeletedIsFalse(Long technoMedId);
}