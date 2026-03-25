package com.zhouzy.blog.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 评论实体
 *
 * @author zhouzy
 */
@Data
@TableName("comment")
public class Comment implements Serializable {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    private Long articleId;

    private Long userId;

    /** 父评论ID（回复某条评论） */
    private Long parentId;

    /** 根评论ID（最顶层评论） */
    private Long rootId;

    private String content;

    private Integer likeCount;

    /** 0-待审核 1-已通过 2-已拒绝 */
    private Integer status;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    @TableLogic
    private Integer deleted;
}
