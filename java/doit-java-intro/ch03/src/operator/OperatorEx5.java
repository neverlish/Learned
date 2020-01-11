// 비트 이동 연산자를 사용하여 연산하기 

package operator;

public class OperatorEx5 {

	public static void main(String[] args) {
		int num = 0B00000101;
		
		System.out.println(num << 2);
		System.out.println(num >> 2);
		System.out.println(num >>> 2);
		
		System.out.println(num);
		
		num = num << 2;
		System.out.println(num);
	}
}
