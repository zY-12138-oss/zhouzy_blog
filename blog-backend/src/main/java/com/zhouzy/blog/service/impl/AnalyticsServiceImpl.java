package com.zhouzy.blog.service.impl;

import com.zhouzy.blog.common.constant.CacheConstants;
import com.zhouzy.blog.common.util.RedisUtil;
import com.zhouzy.blog.entity.AnalyticsDaily;
import com.zhouzy.blog.mapper.AnalyticsDailyMapper;
import com.zhouzy.blog.mapper.ArticleMapper;
import com.zhouzy.blog.mapper.CommentMapper;
import com.zhouzy.blog.mapper.UserMapper;
import com.zhouzy.blog.service.AnalyticsService;
import com.zhouzy.blog.vo.AnalyticsOverviewVO;
import com.zhouzy.blog.vo.ArticleVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 数据分析 Service 实现
 *
 * @author zhouzy
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AnalyticsDailyMapper analyticsDailyMapper;
    private final ArticleMapper articleMapper;
    private final UserMapper userMapper;
    private final CommentMapper commentMapper;
    private final RedisUtil redisUtil;

    @Override
    public AnalyticsOverviewVO getOverview() {
        AnalyticsOverviewVO vo = new AnalyticsOverviewVO();
        vo.setTotalArticles(articleMapper.selectCount(null));
        vo.setTotalUsers(userMapper.selectCount(null));
        vo.setTotalComments(commentMapper.selectCount(null));

        long totalViews = articleMapper.selectList(null).stream()
                .mapToLong(a -> a.getViewCount() == null ? 0 : a.getViewCount()).sum();
        long totalLikes = articleMapper.selectList(null).stream()
                .mapToLong(a -> a.getLikeCount() == null ? 0 : a.getLikeCount()).sum();
        vo.setTotalViews(totalViews);
        vo.setTotalLikes(totalLikes);

        // today
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        Long todayPv = redisUtil.get(CacheConstants.PV_COUNT + today);
        Long todayUv = redisUtil.pfCount(CacheConstants.UV_HYPERLOGLOG + today);
        vo.setTodayPv(todayPv == null ? 0 : todayPv.intValue());
        vo.setTodayUv(todayUv == null ? 0 : todayUv.intValue());

        vo.setPvTrend(getPvTrend(7));
        return vo;
    }

    @Override
    public List<Map<String, Object>> getPvTrend(int days) {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(days - 1);
        List<AnalyticsDaily> records = analyticsDailyMapper.selectByDateRange(start, end);
        List<Map<String, Object>> trend = new ArrayList<>();
        for (int i = 0; i < days; i++) {
            LocalDate date = start.plusDays(i);
            final LocalDate d = date;
            AnalyticsDaily daily = records.stream()
                    .filter(r -> r.getStatDate().equals(d)).findFirst().orElse(null);
            Map<String, Object> item = new HashMap<>();
            item.put("date", date.toString());
            item.put("pv", daily != null ? daily.getPv() : 0);
            item.put("uv", daily != null ? daily.getUv() : 0);
            trend.add(item);
        }
        return trend;
    }

    @Override
    public List<ArticleVO> getArticleRank(int limit) {
        return articleMapper.selectHotArticles(limit);
    }

    @Override
    public void recordPv(String ip) {
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        redisUtil.increment(CacheConstants.PV_COUNT + today);
        redisUtil.pfAdd(CacheConstants.UV_HYPERLOGLOG + today, ip);
    }

    @Override
    public void dailyStatTask() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        String dateStr = yesterday.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        Long pv = redisUtil.get(CacheConstants.PV_COUNT + dateStr);
        Long uv = redisUtil.pfCount(CacheConstants.UV_HYPERLOGLOG + dateStr);

        AnalyticsDaily existing = analyticsDailyMapper.selectByDate(yesterday);
        if (existing != null) {
            existing.setPv(pv == null ? 0 : pv.intValue());
            existing.setUv(uv == null ? 0 : uv.intValue());
            analyticsDailyMapper.updateById(existing);
        } else {
            AnalyticsDaily daily = new AnalyticsDaily();
            daily.setStatDate(yesterday);
            daily.setPv(pv == null ? 0 : pv.intValue());
            daily.setUv(uv == null ? 0 : uv.intValue());
            daily.setLikeCount(0);
            daily.setCommentCount(0);
            daily.setNewUserCount(0);
            analyticsDailyMapper.insert(daily);
        }
        log.info("Daily stat task done for {}: pv={}, uv={}", dateStr, pv, uv);
    }
}
