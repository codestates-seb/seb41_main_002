package com.seb_main_002.security.config;

import com.seb_main_002.security.handler.MemberAuthenticationFailureHandler;
import com.seb_main_002.security.handler.MemberAuthenticationSuccessHandler;
import com.seb_main_002.security.jwt.JwtAuthenticationFilter;
import com.seb_main_002.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;

    // HTTP 요청에 대한 보안 설정 구성
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // 일단 csrf 꺼둠
                //.headers().frameOptions().sameOrigin()
                .headers().frameOptions().disable()//h2용
                .and()
                .cors(Customizer.withDefaults())
                .httpBasic().disable()
                .formLogin().disable()// 폼 로그인 방식이 아님
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests()
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("/api/v1/signup", "/api/v1/login", "/api/v1/home").permitAll() //회원가입, 로그인, 홈 누구나 가능
                        .antMatchers("/api/v1/members/**").hasRole("USER")
                        .antMatchers("/api/v1/addresses/**").hasRole("ADMIN, USER")
                        .antMatchers("/api/v1/orders/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/api/v1/reviews/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/api/v1/items").permitAll()
                        .antMatchers("/h2").permitAll()
                        .anyRequest().permitAll());
        //.anyRequest().hasAnyRole("USER","ADMIN"));

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));

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

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/v1/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());
            builder.addFilter(jwtAuthenticationFilter);
        }

    }
}