package com.lissoft.entity;

import com.lissoft.to.DeviceTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "clinic_device")
public class ClinicDevice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(length = 50)
    private String deviceName;
    @Column(length = 16)
    private String ipAddress;

    @Column(length = 6)
    private String portNumber;
    @Column(length = 6)
    private String portSpeed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinicId")
    private Organization organization;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deviceId")
    private Device device;

    private String handlerCode;
    private String resultFileName;
    private String resultFilePassword;

    public DeviceTO toTO() {
        return DeviceTO.builder()
                .id(getId())
                .organization(getOrganization().toSimpleTO())
                .deviceName(getDevice().getDeviceName())
                .ipAddress(getIpAddress())
                .portNumber(getPortNumber())
                .portSpeed(getPortSpeed())
                .build();
    }
}
