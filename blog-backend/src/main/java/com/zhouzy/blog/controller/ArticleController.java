package com.zhouzy.blog.controller;

import com.zhouzy.blog.common.model.PageResult;
import com.zhouzy.blog.common.model.Result;
import com.zhouzy.blog.dto.ArticleSaveDTO;
import com.zhouzy.blog.query.ArticleQuery;
import com.zhouzy.blog.service.ArticleService;
import com.zhouzy.blog.service.LikeService;
import com.zhouzy.blog.vo.ArticleVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.zhouzy.blog.common.util.IpUtil.getClientIp;

/**
 * 文章接口
 *
 * @author zhouzy
 */
@Tag(name = "文章接口", description = "文章CRUD、发布、点赞")
@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final LikeService likeService;

    @Operation(summary = "文章列表（分页）")
    @GetMapping
    public Result<PageResult<ArticleVO>> listArticles(ArticleQuery query) {
        return Result.success(articleService.listArticles(query));
    }

    @Operation(summary = "文章详情")
    @GetMapping("/{id}")
    public Result<ArticleVO> getArticle(@PathVariable Long id, HttpServletRequest request) {
        ArticleVO vo = articleService.getArticleDetail(id);
        articleService.incrementViewCount(id, getClientIp(request));
        return Result.success(vo);
    }

    @Operation(summary = "创建/更新文章")
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Token")
    public Result<Long> saveArticle(@Valid @RequestBody ArticleSaveDTO dto) {
        return Result.success(articleService.saveArticle(dto));
    }

    @Operation(summary = "更新文章")
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Token")
    public Result<Long> updateArticle(@PathVariable Long id, @Valid @RequestBody ArticleSaveDTO dto) {
        dto.setId(id);
        return Result.success(articleService.saveArticle(dto));
    }

    @Operation(summary = "删除文章")
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Token")
    public Result<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return Result.success();
    }

    @Operation(summary = "发布文章")
    @PostMapping("/{id}/publish")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Token")
    public Result<Void> publishArticle(@PathVariable Long id) {
        articleService.publishArticle(id);
        return Result.success();
    }

    @Operation(summary = "我的文章")
    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Token")
    public Result<PageResult<ArticleVO>> myArticles(ArticleQuery query) {
        return Result.success(articleService.listMyArticles(query));
    }

    @Operation(summary = "热门文章")
    @GetMapping("/hot")
    public Result<List<ArticleVO>> hotArticles(@RequestParam(defaultValue = "10") int limit) {
        return Result.success(articleService.getHotArticles(limit));
    }

    @Operation(summary = "点赞文章")
    @PostMapping("/{id}/like")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Token")
    public Result<Void> likeArticle(@PathVariable Long id) {
        likeService.likeArticle(id);
        return Result.success();
    }

    @Operation(summary = "取消点赞")
    @DeleteMapping("/{id}/like")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "Bearer Token")
    public Result<Void> unlikeArticle(@PathVariable Long id) {
        likeService.unlikeArticle(id);
        return Result.success();
    }
}
