package com.zhouzy.blog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 分类 VO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "分类信息")
public class CategoryVO {

    @Schema(description = "分类ID")
    private Long id;

    @Schema(description = "分类名称")
    private String name;

    @Schema(description = "URL别名")
    private String slug;

    @Schema(description = "描述")
    private String description;

    @Schema(description = "排序")
    private Integer sort;

    @Schema(description = "文章数量")
    private Integer articleCount;
}
