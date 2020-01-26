// try-with-resources 문 사용하기 (2)

package exception;

public class AutoCloseTest {
	public static void main(String[] args) {
		try (AutoCloseObj obj = new AutoCloseObj()) {
			throw new Exception();
		} catch (Exception e) {
			System.out.println("예외 부분입니다");
		}
	}
}
