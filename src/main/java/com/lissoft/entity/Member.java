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
@Table(name = "member")
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(length = 50)
    private String lastName = "";

    @Column(length = 50)
    private String firstName = "";

    @Column(length = 50)
    private String middleName = "";

    private Integer position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinicId")
    private Organization organization;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laboratoryId")
    private Laboratory laboratory;*/

    public SimpleTO toSimpleTO() {
        return new SimpleTO(getId(), getLastName() + " " + getFirstName());
    }

    public String getFullName() {
        return getLastName() + " " + getFirstName() + (getMiddleName() != null ? " " + getMiddleName() : "");
    }

}