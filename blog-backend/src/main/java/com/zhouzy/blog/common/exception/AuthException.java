package com.zhouzy.blog.common.exception;

import com.zhouzy.blog.common.model.ResultCode;
import lombok.Getter;

/**
 * 认证异常
 *
 * @author zhouzy
 */
@Getter
public class AuthException extends RuntimeException {

    private final Integer code;

    public AuthException(String message) {
        super(message);
        this.code = ResultCode.UNAUTHORIZED.getCode();
    }

    public AuthException(ResultCode resultCode) {
        super(resultCode.getMessage());
        this.code = resultCode.getCode();
    }
}
