package ch01;

import java.util.Scanner;

public class ConditionTest {

	public static void main(String[] args) {
		int max;
		
		System.out.println("두 수를 입력 받아서 더 큰 수를 출력하세요\n");
		Scanner scanner = new Scanner(System.in);
		System.out.println("입력 1:");
		int num1 = scanner.nextInt();
		System.out.println("입력 2:");
		int num2 = scanner.nextInt();
		
		max = (num1 > num2) ? num1 : num2;
		
		System.out.println(max);
	}

}
