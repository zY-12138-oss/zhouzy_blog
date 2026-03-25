package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhouzy.blog.entity.LikeRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * 点赞记录 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface LikeRecordMapper extends BaseMapper<LikeRecord> {

    @Select("SELECT COUNT(1) FROM like_record WHERE user_id = #{userId} AND target_id = #{targetId} AND type = #{type}")
    int existsLike(Long userId, Long targetId, Integer type);
}
