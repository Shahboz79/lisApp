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
@Table(name = "medServiceGroup")
public class MedServiceGroup extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;

    private Long technoMedId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizationId")
    private Organization organization;

    public SimpleTO toSimpleTO() {
        return new SimpleTO(getId(), getName());
    }

}
