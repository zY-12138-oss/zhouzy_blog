package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhouzy.blog.entity.ViewRecord;
import org.apache.ibatis.annotations.Mapper;

/**
 * 浏览记录 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface ViewRecordMapper extends BaseMapper<ViewRecord> {
}
