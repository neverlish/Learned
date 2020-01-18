// 주소 값 비교하기

package string;

public class StringTest1 {

	public static void main(String[] args) {
		String str1 = new String("abc");
		String str2 = new String("abc");
		
		System.out.println(str1 == str2);
		System.out.println(str1.equals(str2));
		
		String str3 = "abc";
		String str4 = "abc";

		System.out.println(str3 == str4);
		System.out.println(str3.equals(str4));
	}

}
