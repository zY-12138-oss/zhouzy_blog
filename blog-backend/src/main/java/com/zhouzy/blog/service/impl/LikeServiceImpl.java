package com.zhouzy.blog.service.impl;

import com.zhouzy.blog.common.constant.CacheConstants;
import com.zhouzy.blog.common.constant.SystemConstants;
import com.zhouzy.blog.common.exception.BusinessException;
import com.zhouzy.blog.common.model.ResultCode;
import com.zhouzy.blog.common.util.RedisUtil;
import com.zhouzy.blog.common.util.SecurityUtil;
import com.zhouzy.blog.entity.Article;
import com.zhouzy.blog.entity.LikeRecord;
import com.zhouzy.blog.mapper.ArticleMapper;
import com.zhouzy.blog.mapper.LikeRecordMapper;
import com.zhouzy.blog.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 点赞 Service 实现
 *
 * @author zhouzy
 */
@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final RedisUtil redisUtil;
    private final LikeRecordMapper likeRecordMapper;
    private final ArticleMapper articleMapper;

    @Override
    @Transactional
    public void likeArticle(Long articleId) {
        Long userId = SecurityUtil.getCurrentUserId();
        String setKey = CacheConstants.USER_LIKE_SET + userId;
        if (Boolean.TRUE.equals(redisUtil.sIsMember(setKey, articleId.toString()))) {
            throw new BusinessException("您已点赞过该文章");
        }
        // Redis set记录
        redisUtil.sAdd(setKey, articleId.toString());
        redisUtil.increment(CacheConstants.ARTICLE_LIKE_COUNT + articleId);

        // DB记录
        LikeRecord record = new LikeRecord();
        record.setUserId(userId);
        record.setTargetId(articleId);
        record.setType(SystemConstants.LIKE_TYPE_ARTICLE);
        likeRecordMapper.insert(record);

        // update article like_count
        Article article = articleMapper.selectById(articleId);
        if (article != null) {
            Article update = new Article();
            update.setId(articleId);
            update.setLikeCount(article.getLikeCount() + 1);
            articleMapper.updateById(update);
        }
    }

    @Override
    @Transactional
    public void unlikeArticle(Long articleId) {
        Long userId = SecurityUtil.getCurrentUserId();
        String setKey = CacheConstants.USER_LIKE_SET + userId;
        if (!Boolean.TRUE.equals(redisUtil.sIsMember(setKey, articleId.toString()))) {
            throw new BusinessException("您未点赞过该文章");
        }
        redisUtil.sRemove(setKey, articleId.toString());
        redisUtil.decrement(CacheConstants.ARTICLE_LIKE_COUNT + articleId);

        // remove DB record
        likeRecordMapper.delete(
            new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<LikeRecord>()
                .eq(LikeRecord::getUserId, userId)
                .eq(LikeRecord::getTargetId, articleId)
                .eq(LikeRecord::getType, SystemConstants.LIKE_TYPE_ARTICLE)
        );

        Article article = articleMapper.selectById(articleId);
        if (article != null && article.getLikeCount() > 0) {
            Article update = new Article();
            update.setId(articleId);
            update.setLikeCount(article.getLikeCount() - 1);
            articleMapper.updateById(update);
        }
    }

    @Override
    public boolean isLikedArticle(Long articleId) {
        Long userId = SecurityUtil.getCurrentUserId();
        if (userId == null) return false;
        return Boolean.TRUE.equals(redisUtil.sIsMember(
                CacheConstants.USER_LIKE_SET + userId, articleId.toString()));
    }
}
