// 명시적 형 변

package ch02;

public class ExplicitConversion {

	public static void main(String[] args) {
		double dNum1 = 1.2;
		float fNum2 = 0.9F;
		
		int iNum3 = (int)dNum1 + (int)fNum2;
		int iNum4 = (int)(dNum1 + fNum2);
		
		System.out.print(iNum3);
		System.out.print(iNum4);

	}

}
