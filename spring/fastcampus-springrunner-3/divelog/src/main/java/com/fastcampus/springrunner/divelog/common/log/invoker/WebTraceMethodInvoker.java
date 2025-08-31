package com.fastcampus.springrunner.divelog.common.log.invoker;


import jakarta.servlet.http.HttpServletRequest;

import com.fastcampus.springrunner.divelog.common.log.WebTrace;

import java.lang.reflect.Method;

public interface WebTraceMethodInvoker {

    Method getTargetMethod(HttpServletRequest request);

    WebTrace getWebTrace(Method apiMethod);

}
