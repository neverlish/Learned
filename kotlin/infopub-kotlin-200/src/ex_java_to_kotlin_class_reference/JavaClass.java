package ex_java_to_kotlin_class_reference;

public class JavaClass {
    public static <T> void printClassInfo(Class<T> clazz) {
        System.out.println(clazz.getCanonicalName());
    }
}
