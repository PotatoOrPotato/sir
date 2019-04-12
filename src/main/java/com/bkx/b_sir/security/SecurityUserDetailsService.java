package com.bkx.b_sir.security;

import com.bkx.b_sir.entity.UserEntity;
import com.bkx.b_sir.exception.MyException;
import com.bkx.b_sir.response.ResultObject;
import com.bkx.b_sir.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/**
 * @ClassName: SecurityUserDetailsService
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/27 17:49
 * @Description: TODO
 **/
@Slf4j
//@Component
@Service
public class SecurityUserDetailsService implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username){

        log.info("登录验证开始");
        UserEntity userEntity = userService.selectByname(username);
        if (userEntity == null){
            throw new MyException("当前用户不存在");
        }
        UserDetails user = null;
        try {
            String password = passwordEncoder.encode("123456");
            // 封装用户信息，并返回。参数分别是：用户名，密码，用户权限
            user = new User(username, password, AuthorityUtils.commaSeparatedStringToAuthorityList("admin"));
            log.info("登录验证结束");
        }catch (Exception e){
            log.info("登录验证失败");
            log.info(e.getMessage());
        }
        return user;
    }
}
