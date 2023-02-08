package com.lissoft.entity;

import com.lissoft.to.OrganizationTO;
import com.lissoft.to.SimpleTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@DynamicUpdate
@Entity
@Table(name = "organization")
public class Organization extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private Long technoMedId;

    private String name;
    private String fullName;
    private Integer oblastId;
    private Integer regionId;
    private String zipCode;
    private String address;
    private String contactInfo;
    private String director;

    @Column(columnDefinition = "boolean default false")
    private Boolean blocked = false;

    public SimpleTO toSimpleTO() {
        return new SimpleTO(getId(), getName());
    }

    public OrganizationTO toTO() {
        return new OrganizationTO(getFullName(), getOblastId(), getRegionId(), getZipCode(), getAddress(), getContactInfo(), getDirector(), getBlocked());
    }
}