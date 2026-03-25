package com.zhouzy.blog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 草稿 VO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "草稿信息")
public class DraftVO {

    @Schema(description = "草稿ID")
    private Long id;

    @Schema(description = "标题")
    private String title;

    @Schema(description = "Markdown内容")
    private String contentMd;

    @Schema(description = "摘要")
    private String summary;

    @Schema(description = "分类ID")
    private Long categoryId;

    @Schema(description = "封面")
    private String cover;

    @Schema(description = "更新时间")
    private LocalDateTime updateTime;
}
