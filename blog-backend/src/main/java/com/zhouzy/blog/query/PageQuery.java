package com.zhouzy.blog.query;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 通用分页查询
 *
 * @author zhouzy
 */
@Data
@Schema(description = "分页查询条件")
public class PageQuery {

    @Schema(description = "页码", example = "1")
    private Long current = 1L;

    @Schema(description = "每页数量", example = "10")
    private Long size = 10L;
}
