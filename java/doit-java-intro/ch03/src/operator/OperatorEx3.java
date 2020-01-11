// 단락 회로 평가 실습하기 

package operator;

public class OperatorEx3 {

	public static void main(String[] args) {
		int num1 = 10;
		int i = 2;
		
		boolean value = ((num1 = num1 + 10) < 10) && ((i = i + 2) < 10);
		
		System.out.println(value);
		System.out.println(num1);
		System.out.println(i);

		value = ((num1 = num1 + 10) > 10) || ((i = i + 2) < 10);
		System.out.println(value);
		System.out.println(num1);
		System.out.println(i);
	}
}
