package com.bkx.b_sir.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @ClassName: ResponseBean
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/22 23:43
 * @Description: TODO
 **/
@Data
@ApiModel(description = "返回数据封装实体")
public class ResponseBean {
    @ApiModelProperty(value = "返回状态码")
    private Integer status;
    @ApiModelProperty(value = "返回消息")
    private String message;
    @ApiModelProperty(value = "返回数据")
    private Object data;
}
