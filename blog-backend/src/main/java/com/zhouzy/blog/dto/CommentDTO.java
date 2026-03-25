package com.zhouzy.blog.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 评论请求 DTO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "评论请求")
public class CommentDTO {

    @NotNull(message = "文章ID不能为空")
    @Schema(description = "文章ID")
    private Long articleId;

    @NotBlank(message = "评论内容不能为空")
    @Size(max = 1000, message = "评论内容不能超过1000字")
    @Schema(description = "评论内容")
    private String content;

    @Schema(description = "父评论ID（回复时传入）")
    private Long parentId;

    @Schema(description = "根评论ID")
    private Long rootId;
}
