package com.zhouzy.blog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 文章 VO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "文章信息")
public class ArticleVO {

    @Schema(description = "文章ID")
    private Long id;

    @Schema(description = "作者ID")
    private Long userId;

    @Schema(description = "作者昵称")
    private String authorNickname;

    @Schema(description = "作者头像")
    private String authorAvatar;

    @Schema(description = "标题")
    private String title;

    @Schema(description = "摘要")
    private String summary;

    @Schema(description = "Markdown内容（详情页）")
    private String contentMd;

    @Schema(description = "HTML内容（详情页）")
    private String contentHtml;

    @Schema(description = "封面图")
    private String cover;

    @Schema(description = "分类ID")
    private Long categoryId;

    @Schema(description = "分类名称")
    private String categoryName;

    @Schema(description = "分类slug")
    private String categorySlug;

    @Schema(description = "标签列表")
    private List<TagVO> tags;

    @Schema(description = "状态")
    private Integer status;

    @Schema(description = "是否置顶")
    private Integer isTop;

    @Schema(description = "是否允许评论")
    private Integer allowComment;

    @Schema(description = "浏览量")
    private Integer viewCount;

    @Schema(description = "点赞量")
    private Integer likeCount;

    @Schema(description = "评论量")
    private Integer commentCount;

    @Schema(description = "发布时间")
    private LocalDateTime publishTime;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    @Schema(description = "更新时间")
    private LocalDateTime updateTime;

    @Schema(description = "上一篇文章")
    private ArticleVO prevArticle;

    @Schema(description = "下一篇文章")
    private ArticleVO nextArticle;

    @Schema(description = "当前用户是否已点赞")
    private Boolean liked;
}
