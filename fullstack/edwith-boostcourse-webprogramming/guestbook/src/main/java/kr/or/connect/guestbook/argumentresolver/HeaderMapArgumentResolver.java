package kr.or.connect.guestbook.argumentresolver;

import java.util.Iterator;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class HeaderMapArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		HeaderInfo headerInfo = new HeaderInfo();
		
		Iterator<String> headerNames = webRequest.getHeaderNames();
		
		while (headerNames.hasNext()) {
			String headerName = headerNames.next();
			String headerValue = webRequest.getHeader(headerName);
			
			System.out.println(headerName + ", " + headerValue);
			
			headerInfo.put(headerName, headerValue);
		}
		
		return headerInfo;
	}
	
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterType() == HeaderInfo.class;
	}

}
