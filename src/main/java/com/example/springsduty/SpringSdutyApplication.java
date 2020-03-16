package com.example.springsduty;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.springsduty.mapper")
public class SpringSdutyApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringSdutyApplication.class, args);
    }

}
