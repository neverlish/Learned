package ch01;

public class BitOperationTest {
	public static void main(String[] args) {
		int num1 = 5;
		int num2 = 10;
		
		System.out.println(num1 | num2); // 15
		System.out.println(num1 & num2); // 0
		System.out.println(num1 ^ num2); // 15
		System.out.println(~num1); // -6
		
		System.out.println(num1 << 2); // 20
		System.out.println(num1); // 5
//		System.out.println(num1 <<= 2); // 20
//		System.out.println(num1); // 20
		
		System.out.println(num1 >> 1); // 2
	}
}
