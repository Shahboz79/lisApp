package com.lissoft.dao;

import com.lissoft.entity.Member;

import java.util.List;

public interface MemberDao extends Dao<Member> {
    List<Member> getList();

    List<Member> getMembersByPosition(Integer positionId);

    List<Member> getDoctors();

    List<Member> getSportDoctors();

    List<Member> getDoctorsAndLabors();

    Member getByUserId(Long userId);
}
