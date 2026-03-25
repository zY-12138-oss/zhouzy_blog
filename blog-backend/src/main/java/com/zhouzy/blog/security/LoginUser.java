package com.zhouzy.blog.security;

import com.zhouzy.blog.entity.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Spring Security 登录用户信息
 *
 * @author zhouzy
 */
@Data
public class LoginUser implements UserDetails {

    private Long userId;
    private String username;
    private String password;
    private Integer status;
    private List<GrantedAuthority> authorities;

    public LoginUser(User user, String roleCode) {
        this.userId = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.status = user.getStatus();
        this.authorities = List.of(new SimpleGrantedAuthority(roleCode));
    }

    //无参构造方法
    public LoginUser() {
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return status != null && status == 1;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status != null && status == 1;
    }
}
