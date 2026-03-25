package com.zhouzy.blog.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhouzy.blog.common.exception.BusinessException;
import com.zhouzy.blog.common.model.ResultCode;
import com.zhouzy.blog.common.util.SecurityUtil;
import com.zhouzy.blog.dto.ChangePasswordDTO;
import com.zhouzy.blog.dto.UserProfileDTO;
import com.zhouzy.blog.entity.User;
import com.zhouzy.blog.mapper.SysRoleMapper;
import com.zhouzy.blog.mapper.UserMapper;
import com.zhouzy.blog.service.UserService;
import com.zhouzy.blog.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 用户 Service 实现
 *
 * @author zhouzy
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    private final SysRoleMapper sysRoleMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserVO getCurrentUserInfo() {
        Long userId = SecurityUtil.getCurrentUserId();
        return getUserVOById(userId);
    }

    @Override
    public UserVO getUserVOById(Long userId) {
        User user = getById(userId);
        if (user == null) throw new BusinessException(ResultCode.USER_NOT_FOUND);
        UserVO vo = new UserVO();
        BeanUtils.copyProperties(user, vo);
        var role = sysRoleMapper.selectRoleByUserId(userId);
        vo.setRoleCode(role != null ? role.getRoleCode() : "ROLE_USER");
        return vo;
    }

    @Override
    @Transactional
    public void updateProfile(UserProfileDTO dto) {
        Long userId = SecurityUtil.getCurrentUserId();
        User user = new User();
        user.setId(userId);
        BeanUtils.copyProperties(dto, user);
        updateById(user);
    }

    @Override
    @Transactional
    public void updateAvatar(String avatarUrl) {
        Long userId = SecurityUtil.getCurrentUserId();
        User user = new User();
        user.setId(userId);
        user.setAvatar(avatarUrl);
        updateById(user);
    }

    @Override
    @Transactional
    public void changePassword(ChangePasswordDTO dto) {
        Long userId = SecurityUtil.getCurrentUserId();
        User user = getById(userId);
        if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
            throw new BusinessException(ResultCode.OLD_PASSWORD_ERROR);
        }
        User update = new User();
        update.setId(userId);
        update.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        updateById(update);
    }
}
