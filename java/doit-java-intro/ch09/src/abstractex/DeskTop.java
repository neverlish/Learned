// 추상 클래스 상속받기

package abstractex;

public class DeskTop extends Computer {
	@Override
	public void display() {
		System.out.println("DeskTop display()");
	}
	
	@Override
	public void typing() {
		System.out.println("DeskTop typing()");
	}
}
