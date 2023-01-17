package com.seb_main_002.security.jwt;

import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.security.util.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;
import java.util.List;
import java.util.Map;
import java.util.Objects;

// JWT 검증을 위한 필터
@Component
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    // 예외 처리 로직 -> 예외 발생시 SecurityContext에 Authentication 저장X
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if (!Objects.isNull(authorization)) {
            try {
                Map<String, Object> claims = verifyJws(request);
                setAuthenticationToContext(claims);
            } catch (ExpiredJwtException ee) {
                request.setAttribute("exception", ee);
            } catch (Exception e) {
                request.setAttribute("exception", e);
            }
            filterChain.doFilter(request, response);
        }
    }


    // 특정 조건에 부합하면(true이면) 해당 Filter의 동작을 수행하지 않고 다음 Filter로 건너뛰도록
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        String[] urls = new String[] {"/api/v1/user/refresh-token", "/api/v1/user/login", "/h2.*"};
        return authorization == null || !authorization.startsWith("Bearer");
    }

    // Header에 있는 jwt 중 claims를 얻음
    public Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }
    //Authentication 객체를 SecurityContext에 저장
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("accountId");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
