package com.seb_main_002.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ITEM_NOT_FOUND(404, "Item not found"),
    ORDER_NOT_FOUND(404, "Order not found"),
    CANNOT_CANCEL_ORDER(403, "Order can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    UNAUTHORIZED(401,"Unauthorized");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
