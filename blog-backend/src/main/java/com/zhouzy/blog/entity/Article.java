package com.zhouzy.blog.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 文章实体
 *
 * @author zhouzy
 */
@Data
@TableName("article")
public class Article implements Serializable {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    private Long userId;

    private String title;

    private String summary;

    @TableField(value = "content_md")
    private String contentMd;

    @TableField(value = "content_html")
    private String contentHtml;

    private String cover;

    private Long categoryId;

    /** 0-草稿 1-已发布 2-已下架 */
    private Integer status;

    private Integer isTop;

    private Integer allowComment;

    private Integer viewCount;

    private Integer likeCount;

    private Integer commentCount;

    private LocalDateTime publishTime;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    @TableLogic
    private Integer deleted;
}
