package com.zhouzy.blog.service;

import com.zhouzy.blog.vo.AnalyticsOverviewVO;
import com.zhouzy.blog.vo.ArticleVO;

import java.util.List;
import java.util.Map;

/**
 * 数据分析 Service
 *
 * @author zhouzy
 */
public interface AnalyticsService {

    /**
     * 获取概览统计
     */
    AnalyticsOverviewVO getOverview();

    /**
     * 获取PV趋势（近N天）
     */
    List<Map<String, Object>> getPvTrend(int days);

    /**
     * 获取文章阅读排行
     */
    List<ArticleVO> getArticleRank(int limit);

    /**
     * 记录PV
     */
    void recordPv(String ip);

    /**
     * 每日统计任务（定时调用）
     */
    void dailyStatTask();
}
