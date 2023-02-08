package com.lissoft.entity;

import com.lissoft.to.PatientTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "patient")
public class Patient extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(length = 50)
    private String lastName;

    @Column(length = 50)
    private String firstName;

    @Column(length = 50)
    private String middleName;

    @Column(length = 20)
    private String phoneNumber;

    private Date birthDate;

    @Column(length = 20)
    private String email;

    @Column(length = 10)
    private String sex;

    public String getFullName() {
        return getLastName() + " " + getFirstName();
    }

    public PatientTO toTO() {
        return PatientTO.builder()
                .id(getId())
                .last_name(getLastName())
                .first_name(getFirstName())
                .middle_name(getMiddleName())
                .birthdate(getBirthDate())
                .sex(getSex())
                .email(getEmail())
                .cellphone(getPhoneNumber())
                .build();
    }

    public void fromTO(PatientTO to) {
        setLastName(to.getLast_name());
        setFirstName(to.getFirst_name());
        setMiddleName(to.getMiddle_name());
        setBirthDate(to.getBirthdate());
        setSex(to.getSex());
        setEmail(to.getEmail());
        setPhoneNumber(to.getCellphone());
    }
}
