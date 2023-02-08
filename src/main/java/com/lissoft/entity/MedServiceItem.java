package com.lissoft.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "analyzeItem")
public class MedServiceItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private Long technoMedFieldId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medServiceId")
    private MedService medService;

    private String name;
    private String unit = "";
    private String norm;
    private Integer orderNumber;
    private String hostCode;
    private String deviceCode;
}
