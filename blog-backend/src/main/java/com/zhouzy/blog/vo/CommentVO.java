package com.zhouzy.blog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 评论 VO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "评论信息")
public class CommentVO {

    @Schema(description = "评论ID")
    private Long id;

    @Schema(description = "文章ID")
    private Long articleId;

    @Schema(description = "评论用户ID")
    private Long userId;

    @Schema(description = "作者昵称")
    private String authorNickname;

    @Schema(description = "作者头像")
    private String authorAvatar;

    @Schema(description = "父评论ID")
    private Long parentId;

    @Schema(description = "根评论ID")
    private Long rootId;

    @Schema(description = "评论内容")
    private String content;

    @Schema(description = "点赞数")
    private Integer likeCount;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    @Schema(description = "子评论列表")
    private List<CommentVO> replies;
}
