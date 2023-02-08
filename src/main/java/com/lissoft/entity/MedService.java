package com.lissoft.entity;

import com.lissoft.to.SimpleTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "medService")
public class MedService extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;
    private String code;

    @Column(columnDefinition = "boolean default false")
    private Boolean multiParam;

    private Long technoMedServiceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medServiceGroupId")
    private MedServiceGroup medServiceGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinicId")
    private Organization organization;

    public SimpleTO toSimpleTO() {
        return new SimpleTO(getId(), getName(), getCode());
    }

}
