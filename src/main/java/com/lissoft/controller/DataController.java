package com.lissoft.controller;

import com.lissoft.services.DataService;
import com.lissoft.to.ComDataTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/data")
public class DataController extends BaseController {

    @Autowired
    private DataService service;

    @PostMapping("/urine/add")
    public ResponseEntity<?> add(@RequestBody List<ComDataTO> to) {
        return service.addMochaData(to);
    }

    @PostMapping("/addReadFile")
    public ResponseEntity<?> readAddFile(@RequestParam String fileUrl) {
        return service.readAddFile(fileUrl);

    }
}