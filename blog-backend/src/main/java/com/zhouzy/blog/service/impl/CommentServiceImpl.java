package com.zhouzy.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhouzy.blog.common.constant.SystemConstants;
import com.zhouzy.blog.common.exception.BusinessException;
import com.zhouzy.blog.common.model.PageResult;
import com.zhouzy.blog.common.model.ResultCode;
import com.zhouzy.blog.common.util.SecurityUtil;
import com.zhouzy.blog.dto.CommentDTO;
import com.zhouzy.blog.entity.Article;
import com.zhouzy.blog.entity.Comment;
import com.zhouzy.blog.mapper.ArticleMapper;
import com.zhouzy.blog.mapper.CommentMapper;
import com.zhouzy.blog.query.PageQuery;
import com.zhouzy.blog.service.CommentService;
import com.zhouzy.blog.vo.CommentVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 评论 Service 实现
 *
 * @author zhouzy
 */
@Service
@RequiredArgsConstructor
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

    private final ArticleMapper articleMapper;

    @Override
    public PageResult<CommentVO> listCommentsByArticle(Long articleId, PageQuery query) {
        Page<CommentVO> page = new Page<>(query.getCurrent(), query.getSize());
        baseMapper.selectRootComments(page, articleId);
        // fill replies for each root comment
        page.getRecords().forEach(root -> {
            List<CommentVO> replies = baseMapper.selectReplies(root.getId());
            root.setReplies(replies);
        });
        return PageResult.of(page);
    }

    @Override
    @Transactional
    public Long addComment(CommentDTO dto) {
        Article article = articleMapper.selectById(dto.getArticleId());
        if (article == null) throw new BusinessException(ResultCode.ARTICLE_NOT_FOUND);
        if (article.getAllowComment() != 1) throw new BusinessException(ResultCode.COMMENT_NOT_ALLOWED);

        Comment comment = new Comment();
        comment.setArticleId(dto.getArticleId());
        comment.setUserId(SecurityUtil.getCurrentUserId());
        comment.setContent(dto.getContent());
        comment.setParentId(dto.getParentId());
        comment.setRootId(dto.getRootId() != null ? dto.getRootId() : dto.getParentId());
        comment.setLikeCount(0);
        comment.setStatus(SystemConstants.COMMENT_STATUS_APPROVED);
        save(comment);

        // increment article comment_count
        Article update = new Article();
        update.setId(dto.getArticleId());
        update.setCommentCount(article.getCommentCount() + 1);
        articleMapper.updateById(update);

        return comment.getId();
    }

    @Override
    @Transactional
    public void deleteComment(Long id) {
        Comment comment = getById(id);
        if (comment == null) throw new BusinessException(ResultCode.COMMENT_NOT_FOUND);
        Long userId = SecurityUtil.getCurrentUserId();
        if (!comment.getUserId().equals(userId) && !SecurityUtil.isAdmin()) {
            throw new BusinessException(ResultCode.FORBIDDEN);
        }
        removeById(id);
        // also delete replies
        remove(new LambdaQueryWrapper<Comment>().eq(Comment::getRootId, id));
    }

    @Override
    @Transactional
    public void likeComment(Long commentId) {
        Comment comment = getById(commentId);
        if (comment == null) throw new BusinessException(ResultCode.COMMENT_NOT_FOUND);
        Comment update = new Comment();
        update.setId(commentId);
        update.setLikeCount(comment.getLikeCount() + 1);
        updateById(update);
    }
}
