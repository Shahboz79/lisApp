package com.lissoft.to;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeviceTO extends SimpleTO {
    private Long id;
    private String deviceName;
    private String ipAddress;
    private String handlerCode;
    private String portNumber;
    private String portSpeed;
    private SimpleTO organization;
}
