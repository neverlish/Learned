// try-with-resources 문 사용하기 (1)

package exception;

public class AutoCloseObjTest {
	public static void main(String[] args) {
		try (AutoCloseObj obj = new AutoCloseObj()) {
			
		} catch (Exception e) {
			System.out.println("예외 부분입니다");
		}
	}
}
