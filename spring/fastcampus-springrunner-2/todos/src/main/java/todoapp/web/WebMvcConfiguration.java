package todoapp.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.support.DefaultConversionService;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.ObjectToStringHttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import todoapp.commons.web.view.CommaSeparatedValuesView;
import todoapp.core.todo.domain.Todo;
import todoapp.security.UserSessionRepository;
import todoapp.security.web.servlet.UserSessionHandlerMethodArgumentResolver;

import java.util.ArrayList;
import java.util.List;

/**
 * Spring Web MVC 설정 정보이다.
 *
 * @author springrunner.kr@gmail.com
 */
@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

  private Logger logger = LoggerFactory.getLogger(getClass());

  @Autowired
  private UserSessionRepository userSessionRepository;

  public WebMvcConfiguration() {
    logger.debug("스프링 MVC 설정자가 생성됩니다.");
  }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new UserSessionHandlerMethodArgumentResolver(userSessionRepository));
    }

    @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
//    registry.addResourceHandler("/assets/**")
//            .addResourceLocations("assets/");
//            .addResourceLocations("file:/Users/hyeonjinho/Desktop/dev/Learned/spring/fastcampus-springrunner-2/todos/files/assets/");
//            .addResourceLocations("classpath:assets/");

  }

  @Override
  public void configureViewResolvers(ViewResolverRegistry registry) {
    // registry.enableContentNegotiation();
//    registry.viewResolver(new TodoController.TodoCsvViewResolver());
//    registry.enableContentNegotiation(new CommaSeparatedValuesView());
    // 위와 같이 직접 설정하면, 스프링부 트가 구성한 ContentNegotiatingViewResolver 전략이 무시된다.
  }

  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    DefaultConversionService conversionService = new DefaultConversionService();
    conversionService.addConverter(new Converter<Todo, String>() {
      @Override
      public String convert(Todo source) {
        return source.toString();
      }
    });
    converters.add(new ObjectToStringHttpMessageConverter(conversionService));
  }

//  @Bean(name = "todos")
//  public CommaSeparatedValuesView todoCsvView() {
//    return new CommaSeparatedValuesView();
//  }

  /**
   * 스프링부트가 생성한 ContentNegotiatingViewResolver를 조작할 목적으로 작성된 설정 정보이다.
   */
  @Configuration
  public static class ContentNegotiationCustomizer {

    @Autowired
    public void configurer(ContentNegotiatingViewResolver viewResolver) {
      List<View> defaultViews = new ArrayList<>(viewResolver.getDefaultViews());
      defaultViews.add(new CommaSeparatedValuesView());
      defaultViews.add(new MappingJackson2JsonView());

      viewResolver.setDefaultViews(defaultViews);
    }

  }

}
