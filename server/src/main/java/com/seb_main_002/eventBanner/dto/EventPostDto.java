package com.seb_main_002.eventBanner.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor
public class EventPostDto {
    @NotBlank(message = "이벤트 제목은 공백이 아니어야 합니다.")
    private String title;

    @NotBlank(message = "이벤트 본문은 공백이 아니어야 합니다.")
    private String content;

    @NotBlank
    @Pattern(regexp = "\\d{4}\\/(0[1-9]|1[012])\\/(0[1-9]|[12][0-9]|3[01])$",
            message = "이벤트 종료 시간은 공백이 아니어야 합니다(각 단위는 '/'로 구분). EX) 1999/05/21")
    private String endAt;
}
