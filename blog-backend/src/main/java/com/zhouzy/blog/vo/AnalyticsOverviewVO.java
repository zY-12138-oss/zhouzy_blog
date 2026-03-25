package com.zhouzy.blog.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;
import java.util.Map;

/**
 * 数据分析概览 VO
 *
 * @author zhouzy
 */
@Data
@Schema(description = "数据分析概览")
public class AnalyticsOverviewVO {

    @Schema(description = "总文章数")
    private Long totalArticles;

    @Schema(description = "总浏览量")
    private Long totalViews;

    @Schema(description = "总点赞数")
    private Long totalLikes;

    @Schema(description = "总评论数")
    private Long totalComments;

    @Schema(description = "总用户数")
    private Long totalUsers;

    @Schema(description = "今日PV")
    private Integer todayPv;

    @Schema(description = "今日UV")
    private Integer todayUv;

    @Schema(description = "近7天PV趋势 [{date, pv}]")
    private List<Map<String, Object>> pvTrend;
}
