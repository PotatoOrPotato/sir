package com.bkx.b_sir.utils;

import com.baidu.aip.ocr.AipOcr;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;

/**
 * @ClassName: BaiDuOcrUtil
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/19 17:46
 * @Description: ocr: 图片光学识别
 **/
@Slf4j
public class BaiDuOcrUtil {

    @Value("${baidu.ocr.AppID}")
    private static String APPID;

    @Value("${baidu.ocr.ApiKey}")
    private static String APIKEY;

    @Value("${baidu.ocr.SecretKey}")
    private static String SECRETKEY;



    public static String getWordForImage() {
        AipOcr client = new AipOcr("14913854", "uGs3FsoK6xvWO0bUUA7m4Ria", "MlIVjiI6BGgqIOCb2QnYfhG9Ep9YgMN5");
        // 可选：设置网络连接参数
        client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);
        // 可选：设置代理服务器地址, http和socket二选一，或者均不设置 // 调用接口
        String path = "E:\\File\\images\\23.png";
        JSONObject res = client.basicGeneral(path, new HashMap<String, String>());
        System.out.println(res.toString(2));
        return res.toString();
    }

}
