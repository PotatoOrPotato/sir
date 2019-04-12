package com.bkx.b_sir.security;

import com.bkx.b_sir.security.handler.JwtAuthenticationFailureHandler;
import com.bkx.b_sir.security.handler.JwtAuthorizationFailureHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * @ClassName: BrowerSecurityConfig
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/27 17:45
 * @Description: TODO
 **/
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationFailureHandler jwtAuthenticationFailureHandler;
    @Autowired
    private JwtAuthorizationFailureHandler jwtAuthorizationFailureHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.formLogin()   // 定义当需要用户登录时候，转到的登录页面。
//                .loginPage("/login.html")   // 设置登录页面
//                .loginProcessingUrl("/user/login")   // 自定义的登录接口
//                .and()
//                .authorizeRequests()   // 定义哪些URL需要被保护、哪些不需要被保护
//                .antMatchers("/login.html").permitAll()   // 设置所有人都可以访问登录页面
//                .anyRequest()   // 任何请求,登录后可以访问
//                .authenticated()
//                .and()
//                .csrf().disable();   // 关闭csrf防护

        http.formLogin()                    //  定义当需要用户登录时候，转到的登录页面。
                .and()
                .authorizeRequests()        // 定义哪些URL需要被保护、哪些不需要被保护
                .anyRequest()               // 任何请求,登录后可以访问
                .authenticated();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
