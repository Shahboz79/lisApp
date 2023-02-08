package com.lissoft.controller;

import com.lissoft.fetcher.AccessReader;
import com.lissoft.services.DeviceService;
import com.lissoft.to.AccessFileTo;
import com.lissoft.to.http.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/access")
public class AccessController {
    private  final DeviceService deviceService;

    @PostMapping("/file")
    public ResponseEntity<?> inputAccessFile(@RequestBody AccessFileTo accessFileTo){
        MessageResponse messageResponse=deviceService.inputAccessFile(accessFileTo);
        return ResponseEntity.ok(messageResponse);
    }
}
