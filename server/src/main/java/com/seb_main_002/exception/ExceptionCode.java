package com.seb_main_002.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ITEM_NOT_FOUND(404, "Item not found"),
    ORDER_NOT_FOUND(404, "Order not found"),
    CANNOT_POST_ORDER(400, "Can not Post Order"),
    CANNOT_CANCEL_ORDER(403, "Order can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    UNAUTHORIZED(401,"Unauthorized"),
    CANNOT_CHANGE_SUBSCRIBE(403,"Subscription can not be changed");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
