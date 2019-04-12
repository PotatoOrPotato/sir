package com.bkx.b_sir.utils;

import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;

/**
 * @ClassName: ImageUtil
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/22 16:24
 * @Description: TODO
 **/
@Slf4j
@Data
public class ImageUtil {

    @Value(value = "${sir.image.location}")
    private static String imageUrl;

    @ApiOperation(value = "上传图片", notes = "上传图片")
    @PostMapping(value = "images")
    public static void uploadImage( MultipartFile[] imageArr){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String format = simpleDateFormat.format(new Date());
        File file = new File(imageUrl+File.separator+format+File.separator);
        // 判断文件夹是否存在，不存在，创建
        if (!file.exists()){
            file.mkdirs();
        }
        Arrays.asList(imageArr)
                .stream()
                .forEach(x -> {
                    Calendar cal = Calendar.getInstance();
                    long expiryDate = cal.getTimeInMillis();
                    File fe = new File(file.toString() +File.separator+ expiryDate + x.getOriginalFilename());
                    InputStream inputStream = null;

//                    BufferedImage buff;
//                    ImageIO.read(inputStream);
//                    int width  = buff.getWidth();    //获取上传图片的宽度
//                    int height = buff.getWidth();



                    try {
                        // 压缩图片
                        Thumbnails.of(inputStream)
                                .scale(0.4f)
                                .outputQuality(0.6f)
                                .toFile(fe);
                    } catch (Exception e) {
                        e.printStackTrace();
                        log.info("压缩异常");
                    }
                });
    }
}
