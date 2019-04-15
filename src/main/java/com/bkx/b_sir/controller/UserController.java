package com.bkx.b_sir.controller;

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
     * 注册
     */
    @PostMapping("/regist")
    public ResponseBean insertUser(@RequestBody UserEntity userEntity, BindingResult result){
        if (result.hasErrors()){
            throw new MyException(result.getAllErrors().toString());
        }
        UserEntity user = userService.select(userEntity.getUserName());
        if (user != null){
            throw new MyException(ExceptionCode.USER_NAME_ERROR.getValue());
        }
        try {
            userService.insertUser(userEntity);
            return ResultObject.success();
        }catch (Exception e){
            return ResultObject.error();
        }
    }


    /**
     * 登录
     */
    @PostMapping("/login")
    public ResponseBean login(@RequestBody UserEntity userEntity,BindingResult result){
        if (result.hasErrors()){
            throw new MyException(result.getAllErrors().toString());
        }
        UserEntity user = userService.select(userEntity.getUserName());
        if (user == null){
            return ResultObject.error("用户名或密码错误");
        }else {
            return ResultObject.success("登录成功");
        }
    }


    /**
     * 个人中心
     */
    @PostMapping("/userDetail")
    public ResponseBean userDetail(@RequestBody UserEntity userEntity,BindingResult result){
        if (result.hasErrors()){
            throw new MyException(result.getAllErrors().toString());
        }
        UserEntity user = userService.select(userEntity.getUserName());
        if (user == null){
            return ResultObject.error("用户名或密码错误");
        }else {
            return ResultObject.success(user.toString());
        }
    }
}
