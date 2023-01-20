package com.seb_main_002.security.config;

import com.seb_main_002.member.repository.MemberRepository;
import com.seb_main_002.security.CustomUserDetailsService;
import com.seb_main_002.security.handler.*;
import com.seb_main_002.security.jwt.JwtAuthenticationFilter;
import com.seb_main_002.security.jwt.JwtReIssueFilter;
import com.seb_main_002.security.jwt.JwtTokenizer;
import com.seb_main_002.security.jwt.JwtVerificationFilter;
import com.seb_main_002.security.redis.RedisService;
import com.seb_main_002.security.util.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    private final RedisService redisService;

    private final MemberRepository memberRepository;


    // HTTP 요청에 대한 보안 설정 구성
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                //.headers().frameOptions().sameOrigin()
                .headers().frameOptions().disable()//h2용
                .and()
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 생성 X
                .and()
                .httpBasic().disable()
                .formLogin().disable()// 폼 로그인 방식이 아님
                .apply(new CustomFilterConfigurer())
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // (1) 추가
                .accessDeniedHandler(new MemberAccessDeniedHandler())            // (2) 추가
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        //.antMatchers(HttpMethod.PATCH,"/api/v1/home").hasRole("ADMIN")
                        //.antMatchers(HttpMethod.DELETE,"/api/v1/home").hasRole("ADMIN")
                        .antMatchers("/api/v1/signup", "/api/v1/login", "/api/v1/home", "/api/v1/idcheck/**").permitAll() // aws 추가
                        .antMatchers("/api/v1/orders/**").hasRole("USER") // 주문은 유저만 가능
                        .antMatchers("/api/v1/members/**").hasAnyRole("ADMIN","USER") // 멤버정보는 유저, 어드민 가능
                        //.antMatchers(HttpMethod.GET, "/api/v1/reviews/**").permitAll() // 리뷰 읽기 누구나 가능 -> 생각해보니 review get은 리뷰작성을 위해 쓰는 api
                        .antMatchers(HttpMethod.GET, "/api/v1/items/**").permitAll() // 아이템 정보 읽기 누구나 가능
                        //.antMatchers(HttpMethod.POST, "/api/v1/user/refresh-token").permitAll() // 리프레시 토큰을 이용한 엑세스토큰 재발급
                        .antMatchers("/h2/**").permitAll()
                        .antMatchers("/api/v1/user/**").hasRole("USER")
                        .anyRequest().hasAnyRole("ADMIN", "USER")); // 그 외 기능들 ADMIN, USER만 가능
        //.anyRequest().hasAnyRole("USER","ADMIN"));

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        //configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedOrigins(Arrays.asList("http://seb41team02.s3-website.ap-northeast-2.amazonaws.com","http://localhost:3000")); // aws 추가
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        configuration.setAllowCredentials(true);       // 내 서버가 응답할 때 json을 JS에서 처리할 수 있게 설정
        configuration.addAllowedHeader("*");           // 모든 header에 응답 허용
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh","Set-Cookie"));  //쿠키 미확인 해결
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisService);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/v1/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils, redisService);
            JwtReIssueFilter jwtReIssueFilter = new JwtReIssueFilter(redisService, jwtTokenizer, new CustomUserDetailsService(memberRepository, authorityUtils));
            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtReIssueFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, JwtReIssueFilter.class);

        }
    }
}