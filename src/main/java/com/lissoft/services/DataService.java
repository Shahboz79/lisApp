package com.lissoft.services;

import com.lissoft.to.ComDataTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DataService {
    ResponseEntity<?> addMochaData(List<ComDataTO> to);

    ResponseEntity<?> readAddFile(String fileUrl);
}