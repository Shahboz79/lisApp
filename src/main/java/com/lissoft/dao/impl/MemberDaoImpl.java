package com.lissoft.dao.impl;

import com.lissoft.dao.MemberDao;
import com.lissoft.entity.Member;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(value = "memberDao")
public class MemberDaoImpl extends BaseDaoImpl<Member> implements MemberDao {
    public MemberDaoImpl() {
        super(Member.class);
    }

    @Override
    public List<Member> getList() {
        return getEntityManager().createQuery("select m from Member m where m.deleted = false order by m.lastName, m.firstName asc").getResultList();
    }

    @Override
    public List<Member> getMembersByPosition(Integer positionId) {
        return getEntityManager().createQuery("select m from Member m where m.deleted = false and m.position=:positionId order by m.lastName, m.firstName asc")
                .setParameter("positionId", positionId)
                .getResultList();
    }

    @Override
    public List<Member> getDoctors() {
        return getEntityManager().createQuery("select m from Member m where m.deleted=false and " +
                "m.position in (1,2,3,4,5,6,7,8,9,10,11,12,22,23,25,26,27,28,29,30,31,32,33,34,35,36,41) " +
                "order by m.lastName, m.firstName asc ")
                .getResultList();
    }

    @Override
    public List<Member> getSportDoctors() {
        return getEntityManager().createQuery("select m from Member m where m.deleted=false and m.position=1 order by m.lastName, m.firstName asc ")
                .getResultList();
    }

    @Override
    public List<Member> getDoctorsAndLabors() {
        return getEntityManager().createQuery("select m from Member m where m.deleted=false and m.position in (1,2,3,4,5,6,7,8,9,10,11,12,13,22,23,25,26,27,28,29,30,31,32,33,34,35,36,41) order by m.position, m.lastName, m.firstName asc ")
                .getResultList();
    }

    @Override
    public Member getByUserId(Long userId) {
        List resultList = getEntityManager().createQuery("select u.member from User u where u.deleted=false and u.id=:userId")
                .setParameter("userId", userId)
                .getResultList();
        return resultList != null && !resultList.isEmpty() ? (Member) resultList.get(0) : null;
    }
}
