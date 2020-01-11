// 조건 연산자를 사용하여 부모님의 나이 비교하기 

package operator;

public class OperatorEx4 {

	public static void main(String[] args) {
		int fatherAge = 45;
		int motherAge = 47;
		
		char ch;
		ch = (fatherAge > motherAge) ? 'T' : 'F';
		
		System.out.println(ch);
	}
}
