// BookShelf 클래스 구현하기

package bookshelf;

public class BookShelf extends Shelf implements Queue {
	@Override
	public void enQueue(String title) {
		shelf.add(title);
	}
	
	@Override
	public String deQueue() {
		return shelf.remove(0);
	}
	
	@Override
	public int getSize() {
		return getCount();
	}
}
