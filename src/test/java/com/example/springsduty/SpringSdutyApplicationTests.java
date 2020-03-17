package com.example.springsduty;

import com.example.springsduty.dao.entity.User;
import com.example.springsduty.service.IUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class SpringSdutyApplicationTests {
    @Autowired
    private IUserService iUserService;

    @Test
    void contextLoads() {
        List<User> users = iUserService.list();
        System.out.println(users.size()+"-------------------------");
    }

}
