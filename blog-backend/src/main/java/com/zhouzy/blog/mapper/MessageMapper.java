package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhouzy.blog.entity.Message;
import org.apache.ibatis.annotations.Mapper;

/**
 * 留言板 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface MessageMapper extends BaseMapper<Message> {
}
