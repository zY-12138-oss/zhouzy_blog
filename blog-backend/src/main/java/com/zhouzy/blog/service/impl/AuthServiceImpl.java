package com.zhouzy.blog.service.impl;

import com.zhouzy.blog.common.config.BlogProperties;
import com.zhouzy.blog.common.constant.CacheConstants;
import com.zhouzy.blog.common.exception.BusinessException;
import com.zhouzy.blog.common.model.ResultCode;
import com.zhouzy.blog.common.util.JwtUtil;
import com.zhouzy.blog.common.util.RedisUtil;
import com.zhouzy.blog.dto.LoginDTO;
import com.zhouzy.blog.dto.RegisterDTO;
import com.zhouzy.blog.entity.User;
import com.zhouzy.blog.mapper.SysRoleMapper;
import com.zhouzy.blog.mapper.UserMapper;
import com.zhouzy.blog.security.LoginUser;
import com.zhouzy.blog.service.AuthService;
import com.zhouzy.blog.vo.LoginVO;
import com.zhouzy.blog.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

/**
 * 认证 Service 实现
 *
 * @author zhouzy
 */
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;
    private final UserMapper userMapper;
    private final SysRoleMapper sysRoleMapper;
    private final PasswordEncoder passwordEncoder;
    private final BlogProperties blogProperties;

    @Override
    public LoginVO login(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        String roleCode = loginUser.getAuthorities().iterator().next().getAuthority();

        String accessToken = jwtUtil.generateAccessToken(loginUser.getUserId(), loginUser.getUsername(), roleCode);
        String refreshToken = jwtUtil.generateRefreshToken(loginUser.getUserId());

        redisUtil.set(
                CacheConstants.REFRESH_TOKEN + loginUser.getUserId(),
                refreshToken,
                blogProperties.getJwt().getRefreshTokenExpire(),
                TimeUnit.SECONDS
        );

        User user = userMapper.selectById(loginUser.getUserId());
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        userVO.setRoleCode(roleCode);

        LoginVO loginVO = new LoginVO();
        loginVO.setAccessToken(accessToken);
        loginVO.setRefreshToken(refreshToken);
        loginVO.setExpiresIn(blogProperties.getJwt().getAccessTokenExpire());
        loginVO.setUserInfo(userVO);
        return loginVO;
    }

    @Override
    @Transactional
    public void register(RegisterDTO registerDTO) {
        if (userMapper.selectByUsername(registerDTO.getUsername()) != null) {
            throw new BusinessException(ResultCode.USER_ALREADY_EXISTS);
        }
        if (userMapper.selectByEmail(registerDTO.getEmail()) != null) {
            throw new BusinessException(ResultCode.USER_ALREADY_EXISTS);
        }
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setNickname(registerDTO.getNickname());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setEmail(registerDTO.getEmail());
        user.setStatus(1);
        userMapper.insert(user);
    }

    @Override
    public LoginVO refreshToken(String refreshToken) {
        Long userId = jwtUtil.getUserId(refreshToken);
        String stored = redisUtil.get(CacheConstants.REFRESH_TOKEN + userId);
        if (stored == null || !stored.equals(refreshToken)) {
            throw new BusinessException(ResultCode.REFRESH_TOKEN_INVALID);
        }
        User user = userMapper.selectById(userId);
        if (user == null) throw new BusinessException(ResultCode.USER_NOT_FOUND);
        var role = sysRoleMapper.selectRoleByUserId(userId);
        String roleCode = role != null ? role.getRoleCode() : "ROLE_USER";
        String newAccess = jwtUtil.generateAccessToken(userId, user.getUsername(), roleCode);
        String newRefresh = jwtUtil.generateRefreshToken(userId);
        redisUtil.set(CacheConstants.REFRESH_TOKEN + userId, newRefresh,
                blogProperties.getJwt().getRefreshTokenExpire(), TimeUnit.SECONDS);
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        userVO.setRoleCode(roleCode);
        LoginVO vo = new LoginVO();
        vo.setAccessToken(newAccess);
        vo.setRefreshToken(newRefresh);
        vo.setExpiresIn(blogProperties.getJwt().getAccessTokenExpire());
        vo.setUserInfo(userVO);
        return vo;
    }

    @Override
    public void logout(String token) {
        try {
            Long userId = jwtUtil.getUserId(token);
            redisUtil.delete(CacheConstants.REFRESH_TOKEN + userId);
        } catch (Exception ignored) {}
    }
}
