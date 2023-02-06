package com.seb_main_002.config;

import com.seb_main_002.address.repository.AddressRepository;
import com.seb_main_002.address.service.AddressService;
import com.seb_main_002.review.repository.ReviewRepository;
import com.seb_main_002.review.service.ReviewService;
import com.seb_main_002.security.jwt.JwtTokenizer;
import com.seb_main_002.security.util.AddressAuthInterceptor;
import com.seb_main_002.security.util.MemberAuthInterceptor;
import com.seb_main_002.security.util.ReviewAuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final JwtTokenizer jwtTokenizer;
    private final ReviewService reviewService;
    private final AddressService addressService;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        MemberAuthInterceptor memberAuthInterceptor = new MemberAuthInterceptor(jwtTokenizer);
        ReviewAuthInterceptor reviewAuthInterceptor = new ReviewAuthInterceptor(jwtTokenizer,reviewService);
        AddressAuthInterceptor addressAuthInterceptor = new AddressAuthInterceptor(jwtTokenizer,addressService);

        registry.addInterceptor(memberAuthInterceptor)
                .addPathPatterns(memberAuthInterceptor.AuthEssential);

        registry.addInterceptor(reviewAuthInterceptor)
                .addPathPatterns(reviewAuthInterceptor.AuthEssential);

        registry.addInterceptor(addressAuthInterceptor)
                .addPathPatterns(addressAuthInterceptor.AuthEssential);
    }
    //리뷰 작성 후 재작성 불가
}