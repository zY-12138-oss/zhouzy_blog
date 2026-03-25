package com.zhouzy.blog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

/**
 * 文章保存/更新 DTO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "文章保存请求")
public class ArticleSaveDTO {

    @Schema(description = "文章ID（编辑时传入）")
    private Long id;

    @NotBlank(message = "文章标题不能为空")
    @Size(max = 255, message = "标题不能超过255个字符")
    @Schema(description = "文章标题")
    private String title;

    @Schema(description = "文章摘要")
    private String summary;

    @Schema(description = "Markdown内容")
    private String contentMd;

    @Schema(description = "HTML内容")
    private String contentHtml;

    @Schema(description = "封面图URL")
    private String cover;

    @Schema(description = "分类ID")
    private Long categoryId;

    @Schema(description = "标签ID列表")
    private List<Long> tagIds;

    @Schema(description = "文章状态：0-草稿 1-已发布")
    private Integer status = 0;

    @Schema(description = "是否置顶")
    private Integer isTop = 0;

    @Schema(description = "是否允许评论")
    private Integer allowComment = 1;
}
