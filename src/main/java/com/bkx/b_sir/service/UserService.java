package com.bkx.b_sir.service;

import com.bkx.b_sir.entity.UserEntity;

import java.util.List;

public interface UserService {

    /**
     * 注册
     */
    void insertUser(UserEntity userEntity);

    /**
     * 查询用户
     * @param userName
     * @return
     */
    UserEntity select(String userName);
        }
