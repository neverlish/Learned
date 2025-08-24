package dev.springrunner;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;

public class ReflectionTests {
    @Test
    void objectCreateAndMethodCall() throws Exception {
        Duck duck = new Duck();
        duck.quack();

        Class<?> duckClass = Class.forName("dev.springrunner.ReflectionTests$Duck");
        Object duckObject = duckClass.getDeclaredConstructor().newInstance();

        Method quack = duckObject.getClass().getDeclaredMethod("quack", new Class<?>[0]);
        quack.invoke(duckObject);
    }

    static class Duck {
        void quack() {
            System.out.println("꽥꽥!");
        }
    }
}
