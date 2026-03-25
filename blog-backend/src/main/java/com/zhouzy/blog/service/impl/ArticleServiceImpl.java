package com.zhouzy.blog.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhouzy.blog.common.constant.CacheConstants;
import com.zhouzy.blog.common.constant.SystemConstants;
import com.zhouzy.blog.common.exception.BusinessException;
import com.zhouzy.blog.common.model.PageResult;
import com.zhouzy.blog.common.model.ResultCode;
import com.zhouzy.blog.common.util.RedisUtil;
import com.zhouzy.blog.common.util.SecurityUtil;
import com.zhouzy.blog.dto.ArticleSaveDTO;
import com.zhouzy.blog.entity.Article;
import com.zhouzy.blog.entity.ArticleTag;
import com.zhouzy.blog.mapper.ArticleMapper;
import com.zhouzy.blog.mapper.ArticleTagMapper;
import com.zhouzy.blog.mapper.TagMapper;
import com.zhouzy.blog.query.ArticleQuery;
import com.zhouzy.blog.service.ArticleService;
import com.zhouzy.blog.vo.ArticleVO;
import com.zhouzy.blog.vo.TagVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * 文章 Service 实现
 *
 * @author zhouzy
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    private final ArticleTagMapper articleTagMapper;
    private final TagMapper tagMapper;
    private final RedisUtil redisUtil;

    @Override
    public PageResult<ArticleVO> listArticles(ArticleQuery query) {
        if (query.getStatus() == null) query.setStatus(SystemConstants.ARTICLE_STATUS_PUBLISHED);
        Page<ArticleVO> page = new Page<>(query.getCurrent(), query.getSize());
        baseMapper.selectArticlePage(page, query);
        page.getRecords().forEach(this::fillTags);
        return PageResult.of(page);
    }

    @Override
    public ArticleVO getArticleDetail(Long id) {
        String cacheKey = CacheConstants.ARTICLE_DETAIL + id;
        ArticleVO cached = redisUtil.get(cacheKey);
        if (cached != null) return cached;

        ArticleVO vo = baseMapper.selectArticleDetail(id);
        if (vo == null || vo.getStatus() != SystemConstants.ARTICLE_STATUS_PUBLISHED) {
            throw new BusinessException(ResultCode.ARTICLE_NOT_FOUND);
        }
        fillTags(vo);
        // prev/next
        vo.setPrevArticle(baseMapper.selectPrevArticle(id));
        vo.setNextArticle(baseMapper.selectNextArticle(id));
        // sync view count from Redis
        Long redisView = redisUtil.get(CacheConstants.ARTICLE_VIEW_COUNT + id);
        if (redisView != null) vo.setViewCount(redisView.intValue());

        // check liked
        Long userId = SecurityUtil.getCurrentUserId();
        if (userId != null) {
            vo.setLiked(redisUtil.sIsMember(CacheConstants.USER_LIKE_SET + userId, id.toString()));
        } else {
            vo.setLiked(false);
        }

        redisUtil.set(cacheKey, vo, 10, TimeUnit.MINUTES);
        return vo;
    }

    @Override
    @Transactional
    public Long saveArticle(ArticleSaveDTO dto) {
        Long userId = SecurityUtil.getCurrentUserId();
        Article article;
        if (dto.getId() != null) {
            article = getById(dto.getId());
            if (article == null) throw new BusinessException(ResultCode.ARTICLE_NOT_FOUND);
            if (!article.getUserId().equals(userId) && !SecurityUtil.isAdmin()) {
                throw new BusinessException(ResultCode.ARTICLE_NO_PERMISSION);
            }
        } else {
            article = new Article();
            article.setUserId(userId);
            article.setViewCount(0);
            article.setLikeCount(0);
            article.setCommentCount(0);
        }
        article.setTitle(dto.getTitle());
        article.setSummary(dto.getSummary());
        article.setContentMd(dto.getContentMd());
        article.setContentHtml(dto.getContentHtml());
        article.setCover(dto.getCover());
        article.setCategoryId(dto.getCategoryId());
        article.setIsTop(dto.getIsTop());
        article.setAllowComment(dto.getAllowComment());
        article.setStatus(dto.getStatus() != null ? dto.getStatus() : SystemConstants.ARTICLE_STATUS_DRAFT);
        if (SystemConstants.ARTICLE_STATUS_PUBLISHED == article.getStatus() && article.getPublishTime() == null) {
            article.setPublishTime(LocalDateTime.now());
        }
        saveOrUpdate(article);

        // update tags
        articleTagMapper.deleteByArticleId(article.getId());
        if (!CollectionUtils.isEmpty(dto.getTagIds())) {
            dto.getTagIds().forEach(tagId -> {
                ArticleTag at = new ArticleTag();
                at.setArticleId(article.getId());
                at.setTagId(tagId);
                articleTagMapper.insert(at);
            });
        }
        // evict cache
        redisUtil.delete(CacheConstants.ARTICLE_DETAIL + article.getId());
        redisUtil.delete(CacheConstants.ARTICLE_LIST);
        return article.getId();
    }

    @Override
    @Transactional
    public void deleteArticle(Long id) {
        Long userId = SecurityUtil.getCurrentUserId();
        Article article = getById(id);
        if (article == null) throw new BusinessException(ResultCode.ARTICLE_NOT_FOUND);
        if (!article.getUserId().equals(userId) && !SecurityUtil.isAdmin()) {
            throw new BusinessException(ResultCode.ARTICLE_NO_PERMISSION);
        }
        removeById(id);
        articleTagMapper.deleteByArticleId(id);
        redisUtil.delete(CacheConstants.ARTICLE_DETAIL + id);
    }

    @Override
    @Transactional
    public void publishArticle(Long id) {
        Article article = getById(id);
        if (article == null) throw new BusinessException(ResultCode.ARTICLE_NOT_FOUND);
        article.setStatus(SystemConstants.ARTICLE_STATUS_PUBLISHED);
        if (article.getPublishTime() == null) article.setPublishTime(LocalDateTime.now());
        updateById(article);
        redisUtil.delete(CacheConstants.ARTICLE_DETAIL + id);
    }

    @Override
    @Transactional
    public void offlineArticle(Long id) {
        Article article = getById(id);
        if (article == null) throw new BusinessException(ResultCode.ARTICLE_NOT_FOUND);
        article.setStatus(SystemConstants.ARTICLE_STATUS_OFFLINE);
        updateById(article);
        redisUtil.delete(CacheConstants.ARTICLE_DETAIL + id);
    }

    @Override
    public PageResult<ArticleVO> listMyArticles(ArticleQuery query) {
        query.setUserId(SecurityUtil.getCurrentUserId());
        Page<ArticleVO> page = new Page<>(query.getCurrent(), query.getSize());
        baseMapper.selectArticlePage(page, query);
        page.getRecords().forEach(this::fillTags);
        return PageResult.of(page);
    }

    @Override
    public List<ArticleVO> getHotArticles(int limit) {
        List<ArticleVO> cached = redisUtil.get(CacheConstants.HOT_ARTICLES);
        if (cached != null) {
            return cached;
        }
        List<ArticleVO> list = baseMapper.selectHotArticles(limit);
        redisUtil.set(CacheConstants.HOT_ARTICLES, list, 30, TimeUnit.MINUTES);
        return list;
    }

    @Override
    @Async
    public void incrementViewCount(Long articleId, String ip) {
        String key = CacheConstants.ARTICLE_VIEW_COUNT + articleId;
        Long count = redisUtil.increment(key);
        // sync to DB every 50 views
        if (count != null && count % 50 == 0) {
            Article update = new Article();
            update.setId(articleId);
            update.setViewCount(count.intValue());
            updateById(update);
        }
    }

    private void fillTags(ArticleVO vo) {
        List<TagVO> tags = tagMapper.selectByArticleId(vo.getId())
                .stream().map(t -> { TagVO tv = new TagVO(); tv.setId(t.getId()); tv.setName(t.getName()); tv.setSlug(t.getSlug()); return tv; })
                .toList();
        vo.setTags(tags);
    }
}
