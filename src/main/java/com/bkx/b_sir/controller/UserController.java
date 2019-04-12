package com.bkx.b_sir.controller;

import com.alibaba.fastjson.JSON;
import com.bkx.b_sir.entity.UserEntity;
import com.bkx.b_sir.exception.ExceptionCode;
import com.bkx.b_sir.exception.MyException;
import com.bkx.b_sir.response.ResponseBean;
import com.bkx.b_sir.response.ResultObject;
import com.bkx.b_sir.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @ClassName: UserController
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/25 17:10
 * @Description: TODO
 **/
@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 展示所有的用户
     * @return
     */
    @GetMapping("/showAllUser")
    public ResponseBean showAllUser(){
        List<UserEntity> list = userService.showAllUser();
        return ResultObject.success(list);
    }

    @PostMapping("/insert")
    public ResponseBean run(@RequestBody UserEntity userEntity, BindingResult result){
        if (result.hasErrors()){
            throw new MyException(ExceptionCode.USER_ERROR.getValue());
        }
        userService.insert(userEntity);
        return ResultObject.success();
    }


    @GetMapping("/find")
    public ResponseBean run1(){
        System.err.println("success");
        return ResultObject.success();
    }

}
