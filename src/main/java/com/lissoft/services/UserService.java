package com.lissoft.services;


import com.lissoft.to.http.MessageResponse;
import com.lissoft.to.UserTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    List<UserTO> getUserList();

    UserTO login(String userName, String password);

    ResponseEntity<MessageResponse> changeMemberPassword(Integer id, String oldPassword, String password);

    ResponseEntity<MessageResponse> changePassword(UserTO userTO);

    UserTO getUser(Long id);

    ResponseEntity<MessageResponse> changeLanguage(Integer id, String language);

    ResponseEntity<MessageResponse> saveMemberProfile(UserTO userTO);
}
