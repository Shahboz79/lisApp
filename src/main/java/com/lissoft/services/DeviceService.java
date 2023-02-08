package com.lissoft.services;

import com.lissoft.to.AccessFileTo;
import com.lissoft.to.access.SyncTO;
import com.lissoft.to.http.MessageResponse;
import org.springframework.http.ResponseEntity;

public interface DeviceService {
    ResponseEntity<?> syncData(SyncTO syncTO);

    MessageResponse inputAccessFile(AccessFileTo accessFileTo);
}
