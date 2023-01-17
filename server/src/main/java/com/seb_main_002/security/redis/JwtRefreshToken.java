package com.seb_main_002.security.redis;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "refreshToken", timeToLive = 60)
public class JwtRefreshToken {
    @Id
    private String refreshToken;

    private String accountId;

    public JwtRefreshToken(String refreshToken, String accountId) {
        this.refreshToken = refreshToken;
        this.accountId = accountId;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

}

