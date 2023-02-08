package com.lissoft.to;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AccessFileTo {
    private Long clinicDeviceId;
    private String pathFile;
    private String passwordFile;
}
