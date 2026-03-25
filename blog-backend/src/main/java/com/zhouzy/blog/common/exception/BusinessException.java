package com.zhouzy.blog.common.exception;

import com.zhouzy.blog.common.model.ResultCode;
import lombok.Getter;

/**
 * 业务异常
 *
 * @author zhouzy
 */
@Getter
public class BusinessException extends RuntimeException {

    private final Integer code;

    public BusinessException(String message) {
        super(message);
        this.code = ResultCode.FAIL.getCode();
    }

    public BusinessException(Integer code, String message) {
        super(message);
        this.code = code;
    }

    public BusinessException(ResultCode resultCode) {
        super(resultCode.getMessage());
        this.code = resultCode.getCode();
    }

    public static BusinessException of(ResultCode resultCode) {
        return new BusinessException(resultCode);
    }
}
