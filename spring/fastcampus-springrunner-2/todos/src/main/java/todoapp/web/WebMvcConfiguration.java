package todoapp.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;

/**
 * Spring Web MVC 설정 정보이다.
 *
 * @author springrunner.kr@gmail.com
 */
@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

  private Logger logger = LoggerFactory.getLogger(getClass());

  public WebMvcConfiguration() {
    logger.debug("스프링 MVC 설정자가 생성됩니다.");
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
//    registry.addResourceHandler("/assets/**")
//            .addResourceLocations("assets/");
//            .addResourceLocations("file:/Users/hyeonjinho/Desktop/dev/Learned/spring/fastcampus-springrunner-2/todos/files/assets/");
//            .addResourceLocations("classpath:assets/");
    registry.addResourceHandler("/assets/**")
            .addResourceLocations(
                    "assets/",
                    "file:/Users/hyeonjinho/Desktop/dev/Learned/spring/fastcampus-springrunner-2/todos/files/assets/",
                    "classpath:assets/");
  }

  @Override
  public void configureViewResolvers(ViewResolverRegistry registry) {
    // registry.enableContentNegotiation();
    // 위와 같이 직접 설정하면, 스프링부 트가 구성한 ContentNegotiatingViewResolver 전략이 무시된다.
  }

  /**
   * 스프링부트가 생성한 ContentNegotiatingViewResolver를 조작할 목적으로 작성된 설정 정보이다.
   */
  public static class ContentNegotiationCustomizer {

    public void configurer(ContentNegotiatingViewResolver viewResolver) {
      // TODO ContentNegotiatingViewResolver 조작하기
    }

  }

}
