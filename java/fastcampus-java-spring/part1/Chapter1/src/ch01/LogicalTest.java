package ch01;

public class LogicalTest {

	public static void main(String[] args) {
		int num1 = 10;
		int i = 2;
		
		boolean value = ((num1 = num1 + 10) < 10) || ((i = i + 2) < 10);
		
		System.out.println(value);
		System.out.println(num1);
		System.out.println(i);

	}

}
