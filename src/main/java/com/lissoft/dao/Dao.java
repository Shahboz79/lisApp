package com.lissoft.dao;

import com.lissoft.entity.BaseEntity;

import java.util.List;

public interface Dao<E extends BaseEntity> {
    void saveOrUpdate(E obj);
    void create(E obj);
    void update(E obj);
    void delete(E obj);
    E get(Number id);
    List<E> get(List<Integer> ids);
}
