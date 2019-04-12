package com.bkx.b_sir.utils;

import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Stream;

/**
 * @ClassName: FileUtil
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/22 16:24
 * @Description: TODO
 **/
@Data
@Slf4j
public class FileUtil {

    @Value(value = "${sir.file.location}")
    private String fileUrl;
}
