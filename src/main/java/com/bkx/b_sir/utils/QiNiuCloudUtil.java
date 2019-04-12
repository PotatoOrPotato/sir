package com.bkx.b_sir.utils;

import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import lombok.extern.slf4j.Slf4j;
import com.alibaba.fastjson.JSON;

/**
 * @ClassName: QiNiuCloudUtil
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/19 14:48
 * @Description: TODO
 **/
@Slf4j
public class QiNiuCloudUtil {

    /**
     * 如果已有账号，直接登录七牛开发者后台，查看 Access Key 和 Secret Key
     * Bucket：TODO
     * 获取七牛的token,
     * @param accessKey
     * @param secretKey
     * @param bucket
     * @return
     */
    public static String qiNiuToken(String accessKey,String secretKey,String bucket){
        log.info("accessKey={},secretKey{},bucket={}",accessKey,secretKey,bucket);
        Auth auth = Auth.create(accessKey, secretKey);
        String token = auth.uploadToken(bucket);
        log.info("token={}",token);
        return token;
    }


    /**
     * 上传到七牛云
     * 访问地址 http://res.9qcd.cn/wait
     * @param path 文件路径
     * @param fileName 新的文件名
     * @param accessKey
     * @param secretKey
     * @param bucket 创建的对象空间名
     * @return 返回文件名
     * @throws QiniuException
     */
    public static String uploadImageToQiNiuCloud(String path,String fileName,String accessKey,String secretKey,String bucket) throws QiniuException {
        //构造一个带指定Zone对象的配置类 默认是zone0
        Configuration cfg = new Configuration(Zone.zone0());
        UploadManager uploadManager = new UploadManager(cfg);
        String token = qiNiuToken(accessKey, secretKey, bucket);
        Response response = uploadManager.put(path, fileName, token);
        DefaultPutRet putRet = JSON.parseObject(response.bodyString(),DefaultPutRet.class);
        return putRet.key;
    }

}
