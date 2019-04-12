package com.bkx.b_sir.exception;

import lombok.extern.slf4j.Slf4j;

import java.text.MessageFormat;

/**
 * @ClassName: MyException
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/23 9:50
 * @Description: 异常信息
 **/
@Slf4j
public class MyException extends RuntimeException {

    public MyException() {}
    public MyException(String message) {
        super(message);
    }
    public MyException(Throwable cause) {
        super(cause);
    }
    public MyException(String message,Throwable cause) {
        super(message,cause);
    }
}
