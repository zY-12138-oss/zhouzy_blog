package com.zhouzy.blog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 每日统计实体
 *
 * @author zhouzy
 */
@Data
@TableName("analytics_daily")
public class AnalyticsDaily implements Serializable {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    private LocalDate statDate;

    private Integer pv;

    private Integer uv;

    private Integer likeCount;

    private Integer commentCount;

    private Integer newUserCount;

    private LocalDateTime createTime;
}
