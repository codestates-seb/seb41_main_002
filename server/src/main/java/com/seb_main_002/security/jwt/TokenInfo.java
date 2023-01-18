package com.seb_main_002.security.jwt;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenInfo {
    private String accessToken;
    private String refreshToken;
}
