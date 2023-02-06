package com.seb_main_002.security.util;

import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.springframework.web.servlet.HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE;

@Component
@RequiredArgsConstructor
public class MemberAuthInterceptor implements HandlerInterceptor {

    public List AuthEssential
            = Arrays.asList("/api/v1/members/**");

    public List AuthInessential
            = Arrays.asList("*");

    private final JwtTokenizer jwtTokenizer;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Map<String, Object> stringObjectMap = verifyJws(request);
        //String accountId = SecurityContextHolder.getContext().getAuthentication().getName();

        Object tokenMemberId = stringObjectMap.get("memberId");
        Map<String, String> pathVariable = (Map<String, String>) request.getAttribute(URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String memberId = pathVariable.get("memberId");
        if((Integer) tokenMemberId == Integer.parseInt(memberId)) {
            return true;
        }
        throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);

    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }
}
