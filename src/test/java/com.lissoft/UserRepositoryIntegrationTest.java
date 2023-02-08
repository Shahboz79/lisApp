package com.lissoft;

import com.lissoft.dao.UserDao;
import com.lissoft.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryIntegrationTest {

    @Autowired
    private UserDao userDao;

    @Test
    public void whenCalledSave_thenCorrectNumberOfUsers() {
        List<User> users = (List<User>) userDao.getUserList();
        log.info("Users count: {}", users.size());
        Assertions.assertNotEquals(users.size(), 0);
    }
}
