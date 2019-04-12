package com.bkx.b_sir.utils;

import cn.jiguang.common.resp.APIConnectionException;
import cn.jiguang.common.resp.APIRequestException;
import cn.jsms.api.SendSMSResult;
import cn.jsms.api.common.SMSClient;
import cn.jsms.api.common.model.SMSPayload;
import lombok.extern.slf4j.Slf4j;

import java.util.regex.Pattern;

/**
 * @ClassName: JiGuangPushUtil
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/19 15:08
 * @Description: 发送短信验证码
 **/
@Slf4j
public class JiGuangPushUtil {

    /**
     * 如果已有账号，直接登录七牛开发者后台，查看 masterSecret 和 appkey
     * 发送短信验证码
     * @param mobile 手机号
     * @param masterSecret 秘钥，
     * @param appkey key
     * @return
     */
    public static SendSMSResult sendSms(String mobile, String masterSecret, String appkey ) {
        log.info("发送短信的手机号={}", mobile);
        try {
            if (Pattern.matches(RegularUtil.REGEX_MOBILE, mobile)) {
                SMSClient client = new SMSClient(masterSecret, appkey);
                SMSPayload payload = SMSPayload.newBuilder()
                        .setMobileNumber(mobile)
                        .setTempId(1)
                        .build();
                SendSMSResult res = client.sendSMSCode(payload);
                return res;
            }
        } catch (APIConnectionException e) {
            log.error("APIConnectionException={} ", e);
            return null;
        } catch (APIRequestException e) {
            log.error("APIRequestException={} ", e);
            return null;
        }
        return null;
    }
}
