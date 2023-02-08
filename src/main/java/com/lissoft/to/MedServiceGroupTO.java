package com.lissoft.to;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedServiceGroupTO extends SimpleTO {
    private SimpleTO organization;
}
