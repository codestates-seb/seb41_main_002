package com.seb_main_002.security.util;

import com.seb_main_002.address.entity.Address;
import com.seb_main_002.address.repository.AddressRepository;
import com.seb_main_002.address.service.AddressService;
import com.seb_main_002.exception.BusinessLogicException;
import com.seb_main_002.exception.ExceptionCode;
import com.seb_main_002.review.entity.Review;
import com.seb_main_002.review.repository.ReviewRepository;
import com.seb_main_002.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.springframework.web.servlet.HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE;

@Component
@RequiredArgsConstructor
public class AddressAuthInterceptor implements HandlerInterceptor {

    public List AuthEssential = Arrays.asList("/api/v1/addresses/**","/api/v1/addresses");
    public List AuthInessential = Arrays.asList("*");

    private final JwtTokenizer jwtTokenizer;

    private final AddressService addressService;

    //리뷰 아이디를 통해 멤버아이디를 얻고 토큰에 있는 멤버아이디 비교
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Map<String, String> pathVariable = (Map<String, String>) request.getAttribute(URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String addressId = pathVariable.get("addressId");

        if(addressId == null) {
            return true;
        }

        Map<String, Object> stringObjectMap = verifyJws(request);
        long tokenMemberId = ((Number) stringObjectMap.get("memberId")).longValue();

        //Address address = addressRepository.getReferenceById(Long.parseLong(addressId));
        Address address = addressService.verifyExistAddress(Long.parseLong(addressId));
        if(tokenMemberId == address.getMember().getMemberId()) {
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
