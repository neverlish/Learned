package dev.springrunner;

import org.junit.jupiter.api.Test;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public class AnnotationAndReflectionTests {
    @Test
    void handleAnnotation() throws Exception {
        Class<BlogService> blogServiceClass = BlogService.class;
        Component component = blogServiceClass.getAnnotation(Component.class);
        System.out.println("name: " + component.name());
    }

    @Target({ElementType.METHOD, ElementType.TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    @interface Component {
        String name();
    }

    @Component(name = "블로그 서비스")
    class BlogService {

    }
}
