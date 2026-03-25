package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhouzy.blog.entity.Draft;
import org.apache.ibatis.annotations.Mapper;

/**
 * 草稿 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface DraftMapper extends BaseMapper<Draft> {
}
