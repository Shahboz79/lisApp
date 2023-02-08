package com.lissoft.dao;

import com.lissoft.entity.User;

import java.util.List;

public interface UserDao extends Dao<User> {
    List<User> getUserList();

    User getUser(String userName, String password);

    User getMemberUser(Long memberId);

    User getUserByUserName(String userName);
}
