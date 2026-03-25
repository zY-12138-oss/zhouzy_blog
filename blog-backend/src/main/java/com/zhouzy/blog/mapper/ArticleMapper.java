package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhouzy.blog.entity.Article;
import com.zhouzy.blog.query.ArticleQuery;
import com.zhouzy.blog.vo.ArticleVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 文章 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface ArticleMapper extends BaseMapper<Article> {

    /**
     * 分页查询文章列表（含分类、标签信息）
     */
    IPage<ArticleVO> selectArticlePage(Page<ArticleVO> page, @Param("query") ArticleQuery query);

    /**
     * 查询文章详情（含分类、标签、作者信息）
     */
    ArticleVO selectArticleDetail(@Param("id") Long id);

    /**
     * 查询热门文章（按浏览量）
     */
    List<ArticleVO> selectHotArticles(@Param("limit") int limit);

    /**
     * 查询上一篇文章
     */
    ArticleVO selectPrevArticle(@Param("id") Long id);

    /**
     * 查询下一篇文章
     */
    ArticleVO selectNextArticle(@Param("id") Long id);
}
