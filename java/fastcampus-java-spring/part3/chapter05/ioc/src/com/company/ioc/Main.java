package com.company.ioc;

public class Main {

    public static void main(String[] args) {
        String url = "www.naver.com/books/iot?page=10&size=20&name=sprint-boot";

        Encoder encoder = new Encoder(new UrlEncoder());
        String result = encoder.encode(url);

        System.out.println(result);
    }
}
