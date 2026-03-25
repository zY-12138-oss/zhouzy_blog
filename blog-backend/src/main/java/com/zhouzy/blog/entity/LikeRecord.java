package com.zhouzy.blog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 点赞记录实体
 *
 * @author zhouzy
 */
@Data
@TableName("like_record")
public class LikeRecord implements Serializable {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    private Long userId;

    private Long targetId;

    /** 1-文章 2-评论 */
    private Integer type;

    private LocalDateTime createTime;
}
