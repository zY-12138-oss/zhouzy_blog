package com.zhouzy.blog.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 文章-标签关联实体
 *
 * @author zhouzy
 */
@Data
@TableName("article_tag")
public class ArticleTag implements Serializable {

    private Long articleId;

    private Long tagId;
}
