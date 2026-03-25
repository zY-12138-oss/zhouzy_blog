package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhouzy.blog.entity.AnalyticsDaily;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDate;
import java.util.List;

/**
 * 每日统计 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface AnalyticsDailyMapper extends BaseMapper<AnalyticsDaily> {

    @Select("SELECT * FROM analytics_daily WHERE stat_date = #{date} LIMIT 1")
    AnalyticsDaily selectByDate(LocalDate date);

    @Select("SELECT * FROM analytics_daily WHERE stat_date BETWEEN #{startDate} AND #{endDate} ORDER BY stat_date ASC")
    List<AnalyticsDaily> selectByDateRange(LocalDate startDate, LocalDate endDate);
}
