package com.zhouzy.blog.task;

import com.zhouzy.blog.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 定时任务
 *
 * @author zhouzy
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ScheduledTasks {

    private final AnalyticsService analyticsService;

    /**
     * 每天凌晨1点执行每日统计任务
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void dailyStatTask() {
        log.info("[Scheduled] Daily stat task started");
        analyticsService.dailyStatTask();
        log.info("[Scheduled] Daily stat task completed");
    }
}
