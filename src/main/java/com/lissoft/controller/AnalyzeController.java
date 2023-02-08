package com.lissoft.controller;

import com.lissoft.services.AnalyzeService;
import com.lissoft.to.http.HttpResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/analyze")
public class AnalyzeController extends BaseController {

//    private final AnalyzeService service;

//    public AnalyzeController(AnalyzeService service) {
//        this.service = service;
//    }
//
//    @GetMapping("/list")
//    public ResponseEntity<?> list() {
//        return ResponseEntity.ok(service.list());
//    }

//    @PostMapping("/add")
//    public ResponseEntity<?> add(@RequestBody AnalyzeTO to) {
//        return ResponseEntity.ok(new HttpResponse<>(service.addEdit(to))) ;
//    }

//    @PutMapping("/edit")
//    public ResponseEntity<?> edit(@RequestBody AnalyzeTO to) {
//        return service.addEdit(to);
//    }

    /*@PutMapping("/addToLaboratory")
    public ResponseEntity<?> addToLaboratory(@RequestBody AnalyzeTO to) {
        return service.addToLaboratory(to);
    }*/

}
