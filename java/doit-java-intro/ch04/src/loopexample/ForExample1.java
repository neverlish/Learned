// for문 예제 

package loopexample;

public class ForExample1 {

	public static void main(String[] args) {
		int i;
		int sum;
		
		for (i = 1, sum = 0; i <= 10; i++) {
			sum += i;
		}
		
		System.out.println("1부터 10까지의 합은 " + sum + "입니다");

	}

}
