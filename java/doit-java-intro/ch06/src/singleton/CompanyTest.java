// 변수의 주소 값 비교하기

package singleton;

public class CompanyTest {

	public static void main(String[] args) {
		Company myCompany1 = Company.getInstance();
		Company myCompany2 = Company.getInstance();
		
		System.out.println(myCompany1 == myCompany2);

	}

}
