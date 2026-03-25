package com.zhouzy.blog.security;

import com.zhouzy.blog.common.constant.SystemConstants;
import com.zhouzy.blog.common.exception.BusinessException;
import com.zhouzy.blog.common.model.ResultCode;
import com.zhouzy.blog.entity.SysRole;
import com.zhouzy.blog.entity.User;
import com.zhouzy.blog.mapper.SysRoleMapper;
import com.zhouzy.blog.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 自定义 UserDetailsService
 *
 * @author zhouzy
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserMapper userMapper;
    private final SysRoleMapper sysRoleMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userMapper.selectByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("用户不存在: " + username);
        }
        if (user.getStatus() != SystemConstants.USER_STATUS_NORMAL) {
            throw new BusinessException(ResultCode.USER_DISABLED);
        }
        // 查询用户角色
        SysRole role = sysRoleMapper.selectRoleByUserId(user.getId());
        String roleCode = role != null ? role.getRoleCode() : SystemConstants.ROLE_USER;
        return new LoginUser(user, roleCode);
    }
}
