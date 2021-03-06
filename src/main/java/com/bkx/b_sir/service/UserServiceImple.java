package com.bkx.b_sir.service;

import com.bkx.b_sir.Mapper.UserMapper;
import com.bkx.b_sir.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName: UserServiceImple
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/27 16:42
 * @Description:
 **/
@Service
public class UserServiceImple implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void insertUser(UserEntity userEntity) {
        userMapper.save(userEntity);
    }

    @Override
    public UserEntity select(String userName) {
        UserEntity userEntity = userMapper.findByUserName(userName);
        return userEntity;
    }
}
