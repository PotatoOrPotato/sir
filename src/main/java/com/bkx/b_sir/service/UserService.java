package com.bkx.b_sir.service;

import com.bkx.b_sir.entity.UserEntity;

import java.util.List;

public interface UserService {

    void insert(UserEntity userEntity);

    List<UserEntity> showAllUser();

    UserEntity selectByname(String username);
}
