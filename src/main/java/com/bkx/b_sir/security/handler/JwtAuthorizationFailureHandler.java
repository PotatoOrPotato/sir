//package com.bkx.b_sir.security.handler;
//
//import com.alibaba.fastjson.JSON;
//import com.bkx.b_sir.response.ResultObject;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.AuthenticationFailureHandler;
//import org.springframework.stereotype.Component;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
///**
// * @ClassName: JwtAuthorizationFailureHandler
// * @Auther: BiKaiXuan
// * @Version: V-1.0
// * @Data: Create in 2019/4/13 0:27
// * @Description: TODO
// **/
//@Component
//public class JwtAuthorizationFailureHandler implements AuthenticationFailureHandler {
//    @Override
//    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException {
//        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
//        if(e instanceof AuthenticationException){
//            response.setStatus(HttpStatus.FORBIDDEN.value());
//            response.getWriter().write(JSON.toJSONString(ResultObject.error(String.valueOf(HttpStatus.FORBIDDEN.value()), HttpStatus.FORBIDDEN.getReasonPhrase())));
//        }else{
//            response.setStatus(HttpStatus.FORBIDDEN.value());
//            response.getWriter().write(JSON.toJSONString(ResultObject.error(String.valueOf(HttpStatus.FORBIDDEN.value()), HttpStatus.FORBIDDEN.getReasonPhrase())));
//        }
//    }
//}
