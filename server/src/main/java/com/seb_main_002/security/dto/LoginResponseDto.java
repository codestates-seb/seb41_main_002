package com.seb_main_002.security.dto;

import com.seb_main_002.security.jwt.TokenInfo;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponseDto {
    private TokenInfo tokenInfo;

    private Boolean isSubscribed;

    private String subscribedDate;

}
