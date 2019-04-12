package com.bkx.b_sir.entity;

import com.bkx.b_sir.utils.RegularUtil;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;


/**
 * @ClassName: UserEntity
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/21 9:31
 * @Description: TODO
 **/
@Data
@Entity
@Table(name = "sir_user")
public class UserEntity extends BaseEntity {

    @Pattern(regexp = RegularUtil.REGEX_MOBILE, message = "手机号格式不正确")
    @Column(name = "mobile_phone")
    private String mobilePhone;

    @Email(message="邮箱的格式不正确")
    @Column(name = "emil")
    private String emil;

    @NotEmpty(message = "用户名不能为空")
    @Column(name = "user_name")
    private String userName;

    @NotEmpty(message = "密码不能为空")
    @Column(name = "password")
    private String password;

    @NotNull
    @Column(name = "name_code")
    private String nameCode;
}
