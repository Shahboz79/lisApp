package com.lissoft.entity;

import com.lissoft.to.SimpleTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "laboratory")
public class Laboratory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinicId")
    private Organization organization;*/

    private String name;

    public SimpleTO toSimpleTO() {
        return new SimpleTO(getId(), getName());
    }
}
