package com.bkx.b_sir;

import com.baidu.aip.ocr.AipOcr;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BSirApplicationTests {


    @Value("${baidu.ocr.AppID}")
    private static String APPID;

    @Value("${baidu.ocr.ApiKey}")
    private static String APIKEY;

    @Value("${baidu.ocr.SecretKey}")
    private static String SECRETKEY;

    @Test
    public void contextLoads() {
    }
}
