package com.zhouzy.blog.service;

/**
 * 点赞 Service
 *
 * @author zhouzy
 */
public interface LikeService {

    /**
     * 点赞文章
     */
    void likeArticle(Long articleId);

    /**
     * 取消点赞文章
     */
    void unlikeArticle(Long articleId);

    /**
     * 判断当前用户是否已点赞文章
     */
    boolean isLikedArticle(Long articleId);
}
