package com.greglturnquist.hackingspringbootreactive;

import org.springframework.boot.actuate.trace.http.HttpTrace;
import org.springframework.data.annotation.Id;

public class HttpTraceWrapper {
    private @Id String id;
    private HttpTrace httpTrace;
    public HttpTraceWrapper(HttpTrace httpTrace) {
        this.httpTrace = httpTrace;
    }

    public HttpTrace getHttpTrace() {
        return httpTrace;
    }
}
