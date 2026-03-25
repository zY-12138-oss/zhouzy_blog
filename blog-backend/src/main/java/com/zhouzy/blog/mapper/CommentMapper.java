package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhouzy.blog.entity.Comment;
import com.zhouzy.blog.vo.CommentVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 评论 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface CommentMapper extends BaseMapper<Comment> {

    /**
     * 分页查询文章的根评论（含作者信息）
     */
    @Select("SELECT c.*, u.nickname AS authorNickname, u.avatar AS authorAvatar " +
            "FROM comment c LEFT JOIN user u ON u.id = c.user_id " +
            "WHERE c.article_id = #{articleId} AND c.root_id IS NULL " +
            "AND c.deleted = 0 AND c.status = 1 ORDER BY c.create_time DESC")
    IPage<CommentVO> selectRootComments(Page<CommentVO> page, @Param("articleId") Long articleId);

    /**
     * 查询某根评论下的子评论
     */
    @Select("SELECT c.*, u.nickname AS authorNickname, u.avatar AS authorAvatar " +
            "FROM comment c LEFT JOIN user u ON u.id = c.user_id " +
            "WHERE c.root_id = #{rootId} AND c.deleted = 0 AND c.status = 1 " +
            "ORDER BY c.create_time ASC")
    List<CommentVO> selectReplies(@Param("rootId") Long rootId);
}
