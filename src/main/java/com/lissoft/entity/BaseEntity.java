package com.lissoft.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity implements Serializable {

    protected Date createdDate = new Date();

    @Column(columnDefinition = "boolean default false")
    protected Boolean deleted = false;

    protected Date deletedDate;
    protected Date updatedDate;

    public abstract Long getId();

}
