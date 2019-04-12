package com.bkx.b_sir.exception;

public enum ExceptionCode {

    USER_ERROR(1,"当前用户不存在"),
    PWD_ERROR(2,"密码不正确");

    private Integer index;

    private String value;

    ExceptionCode(Integer index, String value) {
        this.index = index;
        this.value = value;
    }

    public static ExceptionCode getMessage(int index){
        for (ExceptionCode ec : ExceptionCode.values()){
            if (ec.getIndex() == index){
                return ec;
            }
        }
        return null;
    }

    public Integer getIndex() {
        return index;
    }
    public void setIndex(Integer index) {
        this.index = index;
    }
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }
}
