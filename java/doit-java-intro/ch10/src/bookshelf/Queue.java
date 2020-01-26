// Queue 인터페이스 정의하

package bookshelf;

public interface Queue {
	void enQueue(String title);
	String deQueue();
	int getSize();
}
