package com.zhouzy.blog.controller;

import com.zhouzy.blog.common.model.PageResult;
import com.zhouzy.blog.common.model.Result;
import com.zhouzy.blog.dto.CommentDTO;
import com.zhouzy.blog.query.PageQuery;
import com.zhouzy.blog.service.CommentService;
import com.zhouzy.blog.vo.CommentVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * 评论接口
 *
 * @author zhouzy
 */
@Tag(name = "评论接口", description = "评论列表、添加、删除")
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @Operation(summary = "获取文章评论列表")
    @GetMapping("/article/{articleId}")
    public Result<PageResult<CommentVO>> listComments(
            @PathVariable Long articleId, PageQuery query) {
        return Result.success(commentService.listCommentsByArticle(articleId, query));
    }

    @Operation(summary = "添加评论")
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Token")
    public Result<Long> addComment(@Valid @RequestBody CommentDTO dto) {
        return Result.success(commentService.addComment(dto));
    }

    @Operation(summary = "删除评论")
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Token")
    public Result<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return Result.success();
    }

    @Operation(summary = "点赞评论")
    @PostMapping("/{id}/like")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Token")
    public Result<Void> likeComment(@PathVariable Long id) {
        commentService.likeComment(id);
        return Result.success();
    }
}
