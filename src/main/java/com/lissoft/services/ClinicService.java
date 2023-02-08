package com.lissoft.services;

import com.lissoft.to.OrganizationTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ClinicService {
    List<OrganizationTO> list();

    ResponseEntity<?> addEdit(OrganizationTO to);

    ResponseEntity<?> block(OrganizationTO to);

    ResponseEntity<?> medServiceList(Long clinicId);

    ResponseEntity<?> synchronizeWithTM(Long organizationId);
}
