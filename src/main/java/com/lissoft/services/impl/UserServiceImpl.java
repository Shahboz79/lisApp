package com.lissoft.services.impl;

import com.lissoft.dao.MemberDao;
import com.lissoft.dao.UserDao;
import com.lissoft.entity.Member;
import com.lissoft.entity.User;
import com.lissoft.services.UserService;
import com.lissoft.to.http.MessageResponse;
import com.lissoft.to.SimpleTO;
import com.lissoft.to.UserTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service(value = "userService")
public class UserServiceImpl extends BaseService implements UserService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private MemberDao memberDao;

    @Override
    public List<UserTO> getUserList() {
        List<User> users = userDao.getUserList();
        if (users != null && !users.isEmpty()) {
            List<UserTO> result = new ArrayList<>();
            users.forEach(u-> {
                result.add(new UserTO(u.getId(), u.getMember().getLastName(), u.getMember().getFirstName(),
                        u.getMember().getMiddleName(), null, null, null,
                        u.getRoles().stream().map(r->r.getName().name()).collect(Collectors.joining(",")), null, null, null));
            });
            return result;
        }
        return null;
    }

    @Override
    public UserTO login(String userName, String password) {
        User user = userDao.getUser(userName, password);
        if (user != null) {
            return new UserTO(user.getId(), user.getMember().getLastName(), user.getMember().getFirstName(),
                    user.getMember().getMiddleName(), null, null, null,
                    user.getRoles().stream().map(r->r.getName().name()).collect(Collectors.joining(",")),
                    user.getMember().getOrganization() != null ? user.getMember().getOrganization().toSimpleTO() : null,
                    user.getMember().getId(), user.getLanguage());
        }
        return null;
    }

    @Override
    public ResponseEntity<MessageResponse> changeMemberPassword(Integer id, String oldPassword, String password) {
        User user = userDao.get(id);
        if (user != null) {
            if (StringUtils.isNotEmpty(oldPassword) && user.getPassword().equals(oldPassword)) {
                user.setPassword(password);
                userDao.saveOrUpdate(user);
                return ResponseEntity.ok(new MessageResponse("Фойдаланувчи пароли ўзгартирилди"));
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Аввалги парол хато киритилган"));
            }
        }
        return ResponseEntity.internalServerError().body(new MessageResponse("Паролини ўзгартиришда хатолик"));
    }

    @Override
    public ResponseEntity<MessageResponse> changePassword(UserTO userTO) {
        if (StringUtils.isNotEmpty(userTO.getUserName())) {
            User userByUserName = userDao.getUser(userTO.getUserName(), userTO.getPassword());
            if (userByUserName != null) {
                return ResponseEntity.unprocessableEntity().body(new MessageResponse("Бундай фойдаланувчи тизимда мавжуд. Бошқа логин киритинг"));
            }
        }
        User user = userDao.getMemberUser(userTO.getId());
        if (user != null) {
            if (StringUtils.isNotEmpty(userTO.getUserName())) {
                user.setUserName(userTO.getUserName());
            }
            user.setPassword(userTO.getPassword());
            if (user.getMember() == null) {
                user.setMember(memberDao.get(userTO.getId()));
            }
            userDao.saveOrUpdate(user);
            return ResponseEntity.ok(new MessageResponse("Фойдаланувчи пароли ўзгартирилди"));
        } else {
            user = new User();
            user.setUserName(userTO.getUserName());
            user.setPassword(userTO.getPassword());
            user.setMember(memberDao.get(userTO.getId()));
            user.setActive(true);
            userDao.saveOrUpdate(user);
            return ResponseEntity.ok(new MessageResponse("Фойдаланувчи пароли ўзгартирилди"));
        }
    }

    @Override
    public UserTO getUser(Long id) {
        User user = userDao.getMemberUser(id);
        if (user != null) {
            UserTO userTO = new UserTO(user.getId(), user.getMember().getLastName(), user.getMember().getFirstName(), user.getUserName(), user.getPassword());
            userTO.setLanguage(user.getLanguage());
            userTO.setClinic(user.getMember() != null && user.getMember().getOrganization() != null ? user.getMember().getOrganization().toSimpleTO() : new SimpleTO());
        }
        return null;
    }

    @Override
    public ResponseEntity<MessageResponse> changeLanguage(Integer id, String language) {
        User user = userDao.get(id);
        if (user != null) {
            user.setLanguage(language);
            userDao.saveOrUpdate(user);
            return ResponseEntity.ok(new MessageResponse("Тил ўзгартирилди"));
        }
        return ResponseEntity.internalServerError().body(new MessageResponse("Тил ўзгартиришда хатолик"));
    }

    @Override
    public ResponseEntity<MessageResponse> saveMemberProfile(UserTO userTO) {
        User user = userDao.get(userTO.getId());
        if (user != null && user.getMember() != null) {
            Member member = user.getMember();
            member.setLastName(userTO.getLastName());
            member.setFirstName(userTO.getFirstName());
            member.setMiddleName(userTO.getMiddleName());
            memberDao.saveOrUpdate(member);

            return ResponseEntity.ok(new MessageResponse("Ходим маълумотлари сақланди"));
        }
        return ResponseEntity.internalServerError().body(new MessageResponse("Ходим маълумотлари сақлашда хатолик"));
    }
}
