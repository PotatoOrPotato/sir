package com.bkx.b_sir.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.Optional;

/**
 * @ClassName: UserIDAuditorBean
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/28 16:00
 * @Description:
 * 从缓存中取出当前的登录人，
 * 在进行表的操作时，
 * 可以把用户信息直接写进表中
 **/
@Configuration
public class UserIDAuditorBean implements AuditorAware<String> {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public Optional<String> getCurrentAuditor() {

        stringRedisTemplate.opsForValue().set("userName","sir");
        String userName = stringRedisTemplate.opsForValue().get("userName");

        return Optional.of(userName);
    }
}
