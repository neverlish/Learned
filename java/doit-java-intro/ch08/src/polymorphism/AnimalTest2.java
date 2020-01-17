// instanceof로 원래 인스턴스형 확인 후 다운 캐스팅하기

package polymorphism;

import java.util.ArrayList;

public class AnimalTest2 {
	ArrayList<Animal> aniList = new ArrayList<Animal>();
	
	public static void main(String[] args) {
		AnimalTest2 aTest = new AnimalTest2();
		aTest.addAnimal();
		System.out.println("원래 형으로 다운 캐스팅");
		aTest.testCasting();
	}
	
	public void addAnimal() {
		aniList.add(new Human());
		aniList.add(new Tiger());
		aniList.add(new Eagle());
		
		for (Animal ani: aniList) {
			ani.move();
		}
	}
	
	public void testCasting() {
		for (int i = 0; i < aniList.size(); i++) {
			Animal ani = aniList.get(i);
			if (ani instanceof Human) {
				Human h = (Human)ani;
				h.readBook();
			}
			else if (ani instanceof Tiger) {
				Tiger t = (Tiger)ani;
				t.hunting();
			}
			else if (ani instanceof Eagle) {
				Eagle e = (Eagle)ani;
				e.flying();
			}
			else {
				System.out.println("지원되지 않는 형입니다.");
			}
		}
	}

}
