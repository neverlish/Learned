// 부동 소수점 방식의 오류

package ch02;

public class DoubleEx2 {

	public static void main(String[] args) {
		double dnum = 1;
		
		for (int i = 0; i < 10000; i++) {
			dnum = dnum + 0.1;
		}
		
		System.out.println(dnum);

	}

}
