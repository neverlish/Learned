package ch01;

public class ContinueTest {

	public static void main(String[] args) {
		int num;
		for (num = 1; num <= 100; num++) {
			if ((num % 3) != 0) continue;
			
			System.out.println(num);
		}

	}

}
