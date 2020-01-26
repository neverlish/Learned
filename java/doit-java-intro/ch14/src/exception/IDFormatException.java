// 사용자 정의 예외 구현하기

package exception;

public class IDFormatException extends Exception {
	public IDFormatException(String message) {
		super(message);
	}
}
