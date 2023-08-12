package com.springboot.hello.common;

public enum CommonResponse {
    SUCCESS(0, "Success"),
    FAIL(-1, "FAIL");
    int code;
    String msg;

    CommonResponse(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
