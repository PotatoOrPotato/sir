package com.bkx.b_sir.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

import java.security.Key;

/**
 * @ClassName: JwtController
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/20 18:14
 * @Description: 加密--解密
 **/
public class JwtController {

    public static void main(String[] args) {

        Key key = MacProvider.generateKey();
        String compactJws = Jwts.builder()
                .setSubject("Joe")
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

        System.err.println(compactJws);

        if (Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getBody().getSubject().equals("Joe")){
            System.err.println("验证成功");
        }else {
            System.err.println("验证失败");
        }
    }

}
