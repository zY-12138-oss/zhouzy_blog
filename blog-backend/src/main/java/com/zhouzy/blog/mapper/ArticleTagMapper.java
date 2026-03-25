package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhouzy.blog.entity.ArticleTag;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;

/**
 * 文章标签关联 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface ArticleTagMapper extends BaseMapper<ArticleTag> {

    @Delete("DELETE FROM article_tag WHERE article_id = #{articleId}")
    int deleteByArticleId(Long articleId);
}
