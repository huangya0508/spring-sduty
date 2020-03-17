package com.example.springsduty.service.impl;

import com.example.springsduty.dao.entity.User;
import com.example.springsduty.dao.mapper.UserMapper;
import com.example.springsduty.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author huangya
 * @since 2020-03-17
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

}
