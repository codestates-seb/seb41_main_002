package com.seb_main_002.security.redis;

import com.seb_main_002.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Transactional
@RequiredArgsConstructor
@Service
public class RedisService {

    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate<String, String> redisTemplate;

    // redis에 refreshToken 저장
    public void setRefreshToken(String refreshToken, String accountId,  long expiration) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        // refresh token 만료시간 이후 삭제
        valueOperations.set(refreshToken, accountId, Duration.ofMinutes(expiration));
    }
    // redis에 accessToken 저장 -> 로그아웃 시 해당 accessToken을 블랙리스트로 등록.
    public void setAccessTokenLogout(String accessToken, long expiration) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        // accessToken을 블랙리스트로 등록한다 다만 엑세스토큰이 유효기간이 20분이었기에 블랙리스트에서 20분 후 삭제된다.
        valueOperations.set(accessToken,"blackList",Duration.ofMinutes(expiration));
    }


    public String getRefreshToken(String refreshToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        // refresh token 없으면 null 반환
        return valueOperations.get(refreshToken);
    }

    public String getAccessToken(String accessToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(accessToken);
    }

    // 로그아웃시 redis에 존재하는 refreshToken 삭제
    public void deleteRefreshToken(String refreshToken) {
        // delete 메서드는 삭제되면 true를 반환함.
        redisTemplate.delete(refreshToken);
    }
}