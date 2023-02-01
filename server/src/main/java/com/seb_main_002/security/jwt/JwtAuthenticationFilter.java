package com.seb_main_002.security.jwt;

import antlr.Token;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.security.dto.LoginDto;
import com.seb_main_002.security.dto.LoginResponseDto;
import com.seb_main_002.security.redis.RedisService;
import com.seb_main_002.security.util.ErrorResponder;
import com.seb_main_002.subscribe.entity.Subscribe;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// 클라이언트의 로그인 인증 요청을 처리하는 엔트리포인트
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    private final RedisService redisService;

    // (3) 인증 시도 로직 username,password -> LoginDto -> authenticationToken -> authenticationManager에게 인증 위임
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getAccountId(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    // (4) 인증 성공시 호출
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh",refreshToken);

        // redis에 refreshToken저장
        if (redisService.getRefreshToken(refreshToken) == null) {
            redisService.setRefreshToken(refreshToken, member.getAccountId(),jwtTokenizer.getRefreshTokenExpirationMinutes());
        }
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        TokenInfo tokenInfo = TokenInfo.builder()
                .accessToken("Bearer " + accessToken)
                .refreshToken(refreshToken)
                .build();

        Subscribe subscribeInfo = member.getSubscribe();
        Boolean isSubscribed = subscribeInfo.getIsSubscribed();
        String subscribedDate = isSubscribed ? subscribeInfo.getSubscribedDate().format(DateTimeFormatter.ofPattern("yyyy/MM/dd/HH:mm")) : "";

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .tokenInfo(tokenInfo)
                .isSubscribed(isSubscribed)
                .subscribedDate(subscribedDate)
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(loginResponseDto));

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);

    }

    public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("accountId", member.getAccountId());
        claims.put("roles",member.getRoles());
        String subject = member.getAccountId();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }


    private String delegateRefreshToken(Member member) {
        String subject = member.getAccountId();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration, base64EncodedSecretKey);
        return refreshToken;
    }

}
