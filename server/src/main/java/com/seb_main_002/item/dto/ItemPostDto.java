package com.seb_main_002.item.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;

@Data
public class ItemPostDto {

    @NotNull
    private String itemTitle;

    @NotNull
    List<String> tagList = new ArrayList<>();

    @NotNull
    private Integer price;

    @NotNull
    private String content;

    @NotNull
    private String categoryKRName;

    @NotNull
    @Pattern(regexp = "^([A-Za-z])(\\s?[A-Za-z])*$", message = " categoryENName은 영문이어야 합니다.")
    private String categoryENName;

}
