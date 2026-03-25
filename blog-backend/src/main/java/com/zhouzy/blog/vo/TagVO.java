package com.zhouzy.blog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 标签 VO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "标签信息")
public class TagVO {

    @Schema(description = "标签ID")
    private Long id;

    @Schema(description = "标签名称")
    private String name;

    @Schema(description = "URL别名")
    private String slug;

    @Schema(description = "文章数量")
    private Integer articleCount;
}
