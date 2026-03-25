package com.zhouzy.blog.controller;

import com.zhouzy.blog.common.model.Result;
import com.zhouzy.blog.service.AnalyticsService;
import com.zhouzy.blog.vo.AnalyticsOverviewVO;
import com.zhouzy.blog.vo.ArticleVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.zhouzy.blog.common.util.IpUtil.getClientIp;

/**
 * 数据分析接口
 *
 * @author zhouzy
 */
@Tag(name = "数据分析", description = "PV、UV、文章排行")
@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @Operation(summary = "概览统计")
    @GetMapping("/overview")
    public Result<AnalyticsOverviewVO> overview() {
        return Result.success(analyticsService.getOverview());
    }

    @Operation(summary = "PV/UV趋势")
    @GetMapping("/views/trend")
    public Result<List<Map<String, Object>>> pvTrend(
            @RequestParam(defaultValue = "7") int days) {
        return Result.success(analyticsService.getPvTrend(days));
    }

    @Operation(summary = "文章阅读排行")
    @GetMapping("/article/rank")
    public Result<List<ArticleVO>> articleRank(
            @RequestParam(defaultValue = "10") int limit) {
        return Result.success(analyticsService.getArticleRank(limit));
    }

    @Operation(summary = "记录PV（前端埋点）")
    @PostMapping("/track")
    public Result<Void> track(HttpServletRequest request) {
        analyticsService.recordPv(getClientIp(request));
        return Result.success();
    }
}
