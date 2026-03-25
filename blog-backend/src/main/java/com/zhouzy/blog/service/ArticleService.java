package com.zhouzy.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhouzy.blog.common.model.PageResult;
import com.zhouzy.blog.dto.ArticleSaveDTO;
import com.zhouzy.blog.entity.Article;
import com.zhouzy.blog.query.ArticleQuery;
import com.zhouzy.blog.vo.ArticleVO;

import java.util.List;

/**
 * 文章 Service
 *
 * @author zhouzy
 */
public interface ArticleService extends IService<Article> {

    /**
     * 分页查询文章列表
     */
    PageResult<ArticleVO> listArticles(ArticleQuery query);

    /**
     * 获取文章详情
     */
    ArticleVO getArticleDetail(Long id);

    /**
     * 保存文章（新建/更新）
     */
    Long saveArticle(ArticleSaveDTO dto);

    /**
     * 删除文章
     */
    void deleteArticle(Long id);

    /**
     * 发布文章
     */
    void publishArticle(Long id);

    /**
     * 下架文章
     */
    void offlineArticle(Long id);

    /**
     * 获取我的文章列表
     */
    PageResult<ArticleVO> listMyArticles(ArticleQuery query);

    /**
     * 获取热门文章
     */
    List<ArticleVO> getHotArticles(int limit);

    /**
     * 增加浏览量（异步）
     */
    void incrementViewCount(Long articleId, String ip);
}
