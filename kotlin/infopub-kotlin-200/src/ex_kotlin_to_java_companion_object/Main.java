package ex_kotlin_to_java_companion_object;

public class Main {
    public static void main(String[] args) {
        KotlinClass.Companion.setNum(30);
        System.out.println(KotlinClass.Companion.getNum());
        KotlinClass.Companion.hello();
    }
}
