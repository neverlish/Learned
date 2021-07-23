package ch09;

public abstract class Computer {
	public abstract void display();
	public abstract void typing();
	
	void turnOn() {
		System.out.println("전원을 켭니다.");
	}
	
	void turnOff() {
		System.out.println("전원을 끕니다.");
	}
}
