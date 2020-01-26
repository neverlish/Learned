// 생성자 테스트하기

package constructor;

public class PersonTest {

	public static void main(String[] args) {
		Person personLee = new Person("이순신", 175, 75);
		
		Person personKim = new Person();
		personKim.name = "김유신";
		personKim.weight = 85.5F;
		personKim.height = 180.0F;

	}

}
