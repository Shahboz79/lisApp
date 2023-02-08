package com.lissoft.to;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationTO extends SimpleTO {
    private String fullName;
    private Integer oblastId;
    private Integer regionId;
    private String zipCode;
    private String address;
    private String contactInfo;
    private String director;
    private Boolean blocked;

    public OrganizationTO(Long id, Boolean blocked) {
        setId(id);
        this.blocked = blocked;
    }
}
