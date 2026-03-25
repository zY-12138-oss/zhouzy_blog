package com.zhouzy.blog.controller;

import com.zhouzy.blog.common.model.Result;
import com.zhouzy.blog.service.CategoryService;
import com.zhouzy.blog.service.TagService;
import com.zhouzy.blog.vo.CategoryVO;
import com.zhouzy.blog.vo.TagVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 分类与标签接口
 *
 * @author zhouzy
 */
@Tag(name = "分类与标签", description = "分类列表、标签云")
@RestController
@RequiredArgsConstructor
public class CategoryTagController {

    private final CategoryService categoryService;
    private final TagService tagService;

    @Operation(summary = "分类列表")
    @GetMapping("/api/categories")
    public Result<List<CategoryVO>> listCategories() {
        return Result.success(categoryService.listCategories());
    }

    @Operation(summary = "根据slug获取分类")
    @GetMapping("/api/category/{slug}")
    public Result<CategoryVO> getCategoryBySlug(@PathVariable String slug) {
        return Result.success(categoryService.getCategoryBySlug(slug));
    }

    @Operation(summary = "标签列表")
    @GetMapping("/api/tags")
    public Result<List<TagVO>> listTags() {
        return Result.success(tagService.listTags());
    }

    @Operation(summary = "根据slug获取标签")
    @GetMapping("/api/tag/{slug}")
    public Result<TagVO> getTagBySlug(@PathVariable String slug) {
        return Result.success(tagService.getTagBySlug(slug));
    }
}
