package com.zhouzy.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhouzy.blog.dto.ChangePasswordDTO;
import com.zhouzy.blog.dto.UserProfileDTO;
import com.zhouzy.blog.entity.User;
import com.zhouzy.blog.vo.UserVO;

/**
 * 用户 Service
 *
 * @author zhouzy
 */
public interface UserService extends IService<User> {

    /**
     * 获取当前用户信息
     */
    UserVO getCurrentUserInfo();

    /**
     * 更新用户资料
     */
    void updateProfile(UserProfileDTO dto);

    /**
     * 更新头像
     */
    void updateAvatar(String avatarUrl);

    /**
     * 修改密码
     */
    void changePassword(ChangePasswordDTO dto);

    /**
     * 根据ID获取用户VO
     */
    UserVO getUserVOById(Long userId);
}
