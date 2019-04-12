package com.bkx.b_sir.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

/**
 * @ClassName: RedisServiceImple
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/25 9:20
 * @Description: TODO
 **/
@Service
public class RedisServiceImple implements RedisService {

//    @Autowired  开箱即用（只支持string-string）
//    private StringRedisTemplate stringRedisTemplate;
//    @Autowired 需要配置（支持任意类型）
//    private RedisTemplate redisTemplate;
}
