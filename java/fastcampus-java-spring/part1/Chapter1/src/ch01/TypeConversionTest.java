package ch01;

public class TypeConversionTest {

	public static void main(String[] args) {
		
		int iNum = 255;
		byte bNum = (byte)iNum;
		
		System.out.println(bNum); // -1
		
//		double dNum = 3.14;
//		int inum = (int)dNum;
//		
//		System.out.println(inum); // 3
		
		double dNum = 1.2;
		float fNum = 0.9F;
		
		int iNum1 = (int)dNum + (int)fNum;
		int iNum2 = (int)(dNum + fNum);
		
		System.out.println(iNum1); // 1
		System.out.println(iNum2); // 2
		
	}

}
