package com.zhouzy.blog.service;

import com.zhouzy.blog.dto.LoginDTO;
import com.zhouzy.blog.dto.RegisterDTO;
import com.zhouzy.blog.vo.LoginVO;

/**
 * 认证 Service
 *
 * @author zhouzy
 */
public interface AuthService {

    /**
     * 登录
     */
    LoginVO login(LoginDTO loginDTO);

    /**
     * 注册
     */
    void register(RegisterDTO registerDTO);

    /**
     * 刷新Token
     */
    LoginVO refreshToken(String refreshToken);

    /**
     * 登出
     */
    void logout(String token);
}
