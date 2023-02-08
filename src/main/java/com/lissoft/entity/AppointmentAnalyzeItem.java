package com.lissoft.entity;

import com.lissoft.to.AnalyzeItemTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "appointmentAnalyzeItem")
public class AppointmentAnalyzeItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String result;

    private Date resultDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointmentAnalyzeId")
    private AppointmentAnalyze appointmentAnalyze;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medServiceItemId")
    private MedServiceItem medServiceItem;

    public AnalyzeItemTO toTO() {
        return AnalyzeItemTO.builder()
                .id(getId())
                .result(getResult())
                .resultDate(getResultDate())
                .build();
    }
}
