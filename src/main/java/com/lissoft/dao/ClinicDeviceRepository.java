package com.lissoft.dao;

import com.lissoft.entity.ClinicDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClinicDeviceRepository extends JpaRepository<ClinicDevice, Long> {
    List<ClinicDevice> findAllByOrganization_IdAndDeletedIsFalseOrderByDevice_DeviceNameAsc(Long clinicId);

    ClinicDevice getByDeviceId(Long deviceId);
}