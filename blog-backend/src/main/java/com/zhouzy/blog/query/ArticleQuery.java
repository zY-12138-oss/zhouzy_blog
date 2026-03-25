package com.zhouzy.blog.query;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 文章查询条件
 *
 * @author zhouzy
 */
@Data
@Schema(description = "文章查询条件")
public class ArticleQuery {

    @Schema(description = "页码", example = "1")
    private Long current = 1L;

    @Schema(description = "每页数量", example = "10")
    private Long size = 10L;

    @Schema(description = "关键词（标题/摘要）")
    private String keyword;

    @Schema(description = "分类ID")
    private Long categoryId;

    @Schema(description = "标签ID")
    private Long tagId;

    @Schema(description = "作者ID")
    private Long userId;

    @Schema(description = "文章状态：0-草稿 1-已发布 2-已下架")
    private Integer status;

    @Schema(description = "是否置顶")
    private Integer isTop;

    @Schema(description = "排序字段：publish_time/view_count/like_count")
    private String orderBy = "publish_time";

    @Schema(description = "排序方向：ASC/DESC")
    private String orderDir = "DESC";
}
