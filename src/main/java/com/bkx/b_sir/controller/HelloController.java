package com.bkx.b_sir.controller;

import com.bkx.b_sir.exception.MyException;
import com.bkx.b_sir.response.ResponseBean;
import com.bkx.b_sir.response.ResultObject;
import com.bkx.b_sir.utils.ImageUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.transform.Result;

/**
 * @ClassName: HelloController
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/17 18:01
 * @Description: TODO
 **/
@RestController
@RequestMapping("/demo")
public class HelloController {


    @ApiOperation(value = "测试",notes = "测试")
    @GetMapping("/")
    public ResponseBean run() throws Exception {
        System.err.println("hello world ！");
        if (true){
            throw new MyException("他们来看我");
        }
        return ResultObject.error("");
    }


    @ApiOperation(value = "测试",notes = "测试")
    @PostMapping("/uploadImage")
    public void run2(@RequestParam(value = "attachments", required = true) MultipartFile[] attachments){
        ImageUtil.uploadImage(attachments);
        System.err.println("hello world ！");
    }


}
