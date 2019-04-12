//package com.bkx.b_sir.utils;
//
//import com.baidubce.BceClientConfiguration;
//import com.baidubce.auth.DefaultBceCredentials;
//import com.baidubce.services.dumap.DuMapClient;
//import com.baidubce.services.dumap.model.IPLocationParam;
//import org.springframework.beans.factory.annotation.Value;
//
///**
// * @ClassName: DuMapUtil
// * @Auther: BiKaiXuan
// * @Version: V-1.0
// * @Data: Create in 2019/3/30 11:36
// * @Description: TODO
// **/
//public class DuMapUtil {
//
//    @Value("${baidu.ocr.AppID}")
//    private static String APPID;
//
//    @Value("${baidu.ocr.ApiKey}")
//    private static String APIKEY;
//
//    @Value("${baidu.ocr.SecretKey}")
//    private static String SECRETKEY;
//
//    private DuMapClient client;
//
//    private void createDuMapClient() {
//        BceClientConfiguration config = new BceClientConfiguration()
//                .withCredentials(new DefaultBceCredentials("uGs3FsoK6xvWO0bUUA7m4Ria", "MlIVjiI6BGgqIOCb2QnYfhG9Ep9YgMN5"));
//
//        client = new DuMapClient(config);
//    }
//
//    private String callDuMapService() {
//        IPLocationParam params = IPLocationParam.builder()
//                .ip("192.168.43.176")
//                .coor("bd09ll")
//                .build();
//        return client.locate("14913854", params);
//    }
//
//    public String createDuMapClientAndQuery() {
//        createDuMapClient();
//        return callDuMapService();
//    }
//
//    public static void main(String[] args) {
//        DuMapUtil dumapSample = new DuMapUtil();
//        String response = dumapSample.createDuMapClientAndQuery();
//        System.out.print(response);
//    }
//}
