package com.bkx.b_sir.response;

import io.swagger.annotations.ApiModel;
import lombok.Data;

/**
 * @ClassName: ResultObject
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/22 22:25
 * @Description: TODO
 **/
@ApiModel(description = "返回数据封装实体")
@Data
public class ResultObject {

    public static ResponseBean success() {
        ResponseBean response = new ResponseBean();
        response.setStatus(80200);
        response.setMessage("success");
        return response;
    }
    public static ResponseBean success(Object data) {
        ResponseBean response = new ResponseBean();
        response.setStatus(80200);
        response.setMessage("success");
        response.setData(data);
        return response;
    }
    public static ResponseBean success(String message,Object data) {
        ResponseBean response = new ResponseBean();
        response.setStatus(80200);
        response.setMessage(message);
        response.setData(data);
        return response;
    }



    /* 错误信息 */
    public static ResponseBean error(Object data) {
        ResponseBean response = new ResponseBean();
        response.setStatus(90200);
        response.setMessage("error");
        response.setData(data);
        return response;
    }
    public static ResponseBean error(String message,Object data) {
        ResponseBean response = new ResponseBean();
        response.setStatus(90200);
        response.setMessage(message);
        response.setData(data);
        return response;
    }


    /* 正确或错误信息 */
    public static ResponseBean info(Integer status,String message,Object data) {
        ResponseBean entity = new ResponseBean();
        entity.setStatus(status);
        entity.setMessage(message);
        entity.setData(data);
        return entity;
    }
}
