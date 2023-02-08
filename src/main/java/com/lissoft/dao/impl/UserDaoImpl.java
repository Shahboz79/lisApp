package com.lissoft.dao.impl;

import com.lissoft.dao.UserDao;
import com.lissoft.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "userDao")
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {
    public UserDaoImpl() {
        super(User.class);
    }

    @Override
    public List<User> getUserList() {
        return getEntityManager().createQuery("select u from User u where u.deleted=false order by u.id desc").getResultList();
    }

    @Override
    public User getUser(String userName, String password) {
        List resultList = getEntityManager().createQuery("select u from User u where u.deleted=false and u.userName=:userName and u.password=:password")
                .setParameter("userName", userName)
                .setParameter("password", password)
                .getResultList();
        return resultList != null && !resultList.isEmpty() ? (User) resultList.get(0) : null;
    }

    @Override
    public User getMemberUser(Long memberId) {
        List resultList = getEntityManager().createQuery("select u from User u where u.deleted=false and u.active=true and u.member.id=:memberId")
                .setParameter("memberId", memberId)
                .getResultList();
        return resultList != null && !resultList.isEmpty() ? (User) resultList.get(0) : null;
    }

    @Override
    public User getUserByUserName(String userName) {
        List resultList = getEntityManager().createQuery("select u from User u where u.userName=:userName")
                .setParameter("userName", userName).getResultList();
        return !resultList.isEmpty() ? (User) resultList.get(0) : null;
    }
}
