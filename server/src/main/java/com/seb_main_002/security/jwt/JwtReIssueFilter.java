package com.seb_main_002.security.jwt;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.security.CustomUserDetailsService;
import com.seb_main_002.security.CustomUserDetailsService.MemberDetails;
import com.seb_main_002.security.redis.RedisService;
import com.seb_main_002.security.util.ErrorResponder;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
public class JwtReIssueFilter extends OncePerRequestFilter {

    private final RedisService redisService;
    private final JwtTokenizer jwtTokenizer;
    private final CustomUserDetailsService customUserDetailsService;
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String requestURI = request.getRequestURI();
        String refreshToken = request.getHeader("Refresh");
        return !requestURI.equals("/api/v1/user/refresh-token") || !StringUtils.hasText(refreshToken);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            //헤더에 존재하는 refreshToken를 검증하고 레디스에 저장된 refreshToken과 accountId로 accessToken을 만들어서 발급한다.

            String refreshToken = request.getHeader("Refresh");
            String encodeBase64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            jwtTokenizer.getClaims(refreshToken, encodeBase64SecretKey);
            String accountId = redisService.getRefreshToken(refreshToken);
            MemberDetails memberDetails = (MemberDetails) customUserDetailsService.loadUserByUsername(accountId);

            String accessToken = delegateAccessToken(memberDetails, encodeBase64SecretKey);

            response.setHeader("Authorization","Bearer " + accessToken);

            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");

            TokenInfo tokenInfo = TokenInfo.builder()
                    .accessToken("Bearer " + accessToken)
                    .refreshToken(refreshToken)
                    .build();
            ObjectMapper objectMapper = new ObjectMapper();
            response.getWriter().write(objectMapper.writeValueAsString(tokenInfo));

        } catch (ExpiredJwtException jwtException) {
            request.setAttribute("exception", jwtException);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        //filterChain.doFilter(request,response); // request 헤더에 엑세스토큰이 없기에 엑세스토큰 검증하는 필터로 보내지 않았습니다.
    }
    public String delegateAccessToken(MemberDetails memberDetails, String encodeBase64SecretKey) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberDetails.getMemberId());
        claims.put("accountId", memberDetails.getAccountId());
        claims.put("roles",memberDetails.getRoles());
        String subject = memberDetails.getAccountId();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
        return accessToken;
    }
}
