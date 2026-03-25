package com.zhouzy.blog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 浏览记录实体
 *
 * @author zhouzy
 */
@Data
@TableName("view_record")
public class ViewRecord implements Serializable {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    private Long articleId;

    private Long userId;

    private String ip;

    private String userAgent;

    private LocalDateTime createTime;
}
