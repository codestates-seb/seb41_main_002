package com.seb_main_002.security.util;

import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.member.entity.Member;
import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.review.entity.Review;
import com.seb_main_002.review.repository.ReviewRepository;
import com.seb_main_002.review.service.ReviewService;
import com.seb_main_002.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.web.servlet.HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE;

@Component
@RequiredArgsConstructor
public class ReviewAuthInterceptor implements HandlerInterceptor{

    public List AuthEssential = Arrays.asList("/api/v1/reviews/**");
    public List AuthInessential = Arrays.asList("*");

    private final JwtTokenizer jwtTokenizer;
    private final ReviewService reviewService;

    //리뷰 아이디를 통해 멤버아이디를 얻고 토큰에 있는 멤버아이디 비교
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Map<String, String> pathVariable = (Map<String, String>) request.getAttribute(URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String reviewid = pathVariable.get("reviewId");

        if(reviewid == null) {
            return true;
        }
        Map<String, Object> stringObjectMap = verifyJws(request);
        long tokenMemberId = ((Number) stringObjectMap.get("memberId")).longValue();
        Review review = reviewService.findReview(Long.parseLong(reviewid));

        if(tokenMemberId == review.getMember().getMemberId()) {
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
