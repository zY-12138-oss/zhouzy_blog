package com.zhouzy.blog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 友链 VO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "友链信息")
public class FriendLinkVO {

    @Schema(description = "ID")
    private Long id;

    @Schema(description = "网站名称")
    private String name;

    @Schema(description = "网站地址")
    private String url;

    @Schema(description = "头像")
    private String avatar;

    @Schema(description = "描述")
    private String description;

    @Schema(description = "排序")
    private Integer sort;
}
