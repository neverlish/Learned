package thread.memory.management.stack;

public class Main {
    static void main() {
        int x = 1;
        int y = 2;
        int result = sum(x, y);
    }

    private static int sum(int a, int b) {
        int s = a + b;
        return s;
    }
}
