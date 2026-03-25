package com.zhouzy.blog.aspect;

import com.zhouzy.blog.common.annotation.RateLimit;
import com.zhouzy.blog.common.exception.BusinessException;
import com.zhouzy.blog.common.model.ResultCode;
import com.zhouzy.blog.common.util.IpUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.lang.reflect.Method;
import java.util.concurrent.TimeUnit;

/**
 * 接口限流切面
 *
 * @author zhouzy
 */
@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class RateLimitAspect {

    private final RedisTemplate<String, Object> redisTemplate;

    @Around("@annotation(com.zhouzy.blog.common.annotation.RateLimit)")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        MethodSignature signature = (MethodSignature) point.getSignature();
        Method method = signature.getMethod();
        RateLimit rateLimit = method.getAnnotation(RateLimit.class);

        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) return point.proceed();

        HttpServletRequest request = attributes.getRequest();
        String ip = IpUtil.getClientIp(request);
        String key = "blog:rate:limit:" + method.getName() + ":" + ip;

        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1) {
            redisTemplate.expire(key, rateLimit.time(), rateLimit.timeUnit());
        }
        if (count != null && count > rateLimit.count()) {
            log.warn("Rate limit triggered: key={}, count={}", key, count);
            throw new BusinessException(ResultCode.TOO_MANY_REQUESTS.getCode(), rateLimit.message());
        }
        return point.proceed();
    }
}
