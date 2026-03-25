package com.zhouzy.blog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 留言 VO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "留言信息")
public class MessageVO {

    @Schema(description = "留言ID")
    private Long id;

    @Schema(description = "昵称")
    private String nickname;

    @Schema(description = "留言内容")
    private String content;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;
}
