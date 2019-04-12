package com.bkx.b_sir.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

/**
 * @ClassName: BaseEntity
 * @Auther: BiKaiXuan
 * @Version: V-1.0
 * @Data: Create in 2019/3/28 9:59
 * @Description: TODO
 **/
@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {
    /*
    * nullable=false 保存数据时，必须有值
    * updatable=false 更新表时，不会更新这个值
    * unique = true 值在这个表中是唯一的
    * @Transient 不在数据库中映射字段
    * @JoinColumn 关联字段
     * */

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @CreatedBy
    @Column(name = "create_name")
    private String createName;

    @CreatedDate
    @Column(name = "create_date" ,nullable=false ,updatable=false)
    private Date createDate;

    @LastModifiedBy
    @Column(name = "update_name")
    private String updateName;

    @LastModifiedDate
    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "status")
    @ApiModelProperty(notes = "1：有效,0：无效")
    private Integer status;

    @Column(name = "remark")
    private String remark;
}
