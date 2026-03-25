package com.zhouzy.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhouzy.blog.common.model.PageResult;
import com.zhouzy.blog.dto.CommentDTO;
import com.zhouzy.blog.entity.Comment;
import com.zhouzy.blog.query.PageQuery;
import com.zhouzy.blog.vo.CommentVO;

/**
 * 评论 Service
 *
 * @author zhouzy
 */
public interface CommentService extends IService<Comment> {

    /**
     * 获取文章评论列表（分页，含嵌套回复）
     */
    PageResult<CommentVO> listCommentsByArticle(Long articleId, PageQuery query);

    /**
     * 添加评论
     */
    Long addComment(CommentDTO dto);

    /**
     * 删除评论
     */
    void deleteComment(Long id);

    /**
     * 点赞评论
     */
    void likeComment(Long commentId);
}
