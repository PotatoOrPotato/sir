package com.bkx.b_sir.utils;

/**
 * @ClassName: RegularUtil
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/19 16:08
 * @Description: 正则集中营
 **/
public class RegularUtil {

    /* 密码：4-20位，包含大小写字母和数字 */
    public static final String REGEX_PWD = "^[A-Za-z0-9]{4,20}$";
    /* 校验手机号 */
    public static final String REGEX_MOBILE = "^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$";
    /* 校验数字的 */
    public static final String REGEX_NUM = "^(-?[1-9]\\d*\\.?\\d*)|(-?0\\.\\d*[1-9])|(-?[0])|(-?[0]\\.\\d*)$";
    /* 验证邮箱 */
    public static final String REGEX_EMAIL = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
    /* 验证身份证 */
    public static final String REGEX_ID_CARD = "(^\\d{18}$)|(^\\d{15}$)";
}
