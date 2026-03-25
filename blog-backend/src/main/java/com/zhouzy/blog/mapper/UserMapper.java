package com.zhouzy.blog.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhouzy.blog.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * 用户 Mapper
 *
 * @author zhouzy
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

    @Select("SELECT * FROM user WHERE username = #{username} AND deleted = 0")
    User selectByUsername(String username);

    @Select("SELECT * FROM user WHERE email = #{email} AND deleted = 0")
    User selectByEmail(String email);
}
