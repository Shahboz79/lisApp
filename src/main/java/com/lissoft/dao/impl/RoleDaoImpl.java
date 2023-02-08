package com.lissoft.dao.impl;

import com.lissoft.dao.RoleDao;
import com.lissoft.entity.Role;
import org.springframework.stereotype.Repository;

@Repository
public class RoleDaoImpl extends BaseDaoImpl<Role> implements RoleDao {
    public RoleDaoImpl() {
        super(Role.class);
    }
}
