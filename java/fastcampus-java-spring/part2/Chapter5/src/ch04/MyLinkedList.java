package ch04;

public class MyLinkedList {
	private MyListNode head;
	int count;
	
	public MyLinkedList() {
		head = null;
		count = 0;
	}
	
	public MyListNode addElement(String data) {
		MyListNode newNode;
		
		if (head == null) {
			newNode = new MyListNode(data);
			head = newNode;
		} 
		else {
			newNode = new MyListNode(data);
			MyListNode temp = head;
			while (temp.next != null) {
				temp = temp.next;
			}
			temp.next = newNode;
		}

		count++;
		return newNode;
	}
	
	public MyListNode insertElement(int position, String data) {
		int i;
		MyListNode tempNode = head;
		MyListNode preNode = null;
		
		MyListNode newNode = new MyListNode(data);
		
		if (position < 0 || position > count) {
			return null;
		}
		
		if (position == 0) {
			newNode.next = head;
			head = newNode;
		}
		
		else {
			for (i = 0; i < position; i++) {
				preNode = tempNode;
				tempNode = tempNode.next;
			}
			newNode.next = preNode.next;
			preNode.next = newNode;
		}
		
		count++;
		return newNode;
			
	}
	
	public MyListNode removeElement(int position) {
		int i;
		
		MyListNode tempNode = head;
		MyListNode preNode = null;
		
		if (position == 0) {
			head = tempNode.next;
		}
		else {
			for (i = 0; i < position; i++) {
				preNode = tempNode;
				tempNode = tempNode.next;
			}
			preNode.next = tempNode.next;
		}
		count--;
		
		return tempNode;
	}
	
	public String getElement(int position) {
		int i;
		MyListNode tempNode = head;
		
		if (position >= count) {
			System.out.println("검색 위치 오류 입니다. 현재 리스트의 개수는 " + count + "개 입니다.");
			return new String("error");
		}
		
		if (position == 0) {
			return head.getData();
		}
		
		for (i = 0; i < position; i++) {
			tempNode = tempNode.next;
		}
		
		return tempNode.getData();
	}
	
	public MyListNode getNode(int position)
	{
		int i;
		MyListNode tempNode = head;
		
		if(position >= count ){
			System.out.println("검색 위치 오류 입니다. 현재 리스트의 개수는 " + count +"개 입니다.");
			return null;
		}
		
		if(position == 0){  //맨 인 경우

			return head;
		}
		
		for(i=0; i<position; i++){
			tempNode = tempNode.next;
			
		}
		return tempNode;
	}

	public void removeAll()
	{
		head = null;
		count = 0;
		
	}
	
	public int getSize()
	{
		return count;
	}
	
	public void printAll()
	{
		if(count == 0){
			System.out.println("출력할 내용이 없습니다.");
			return;
		}
		
		MyListNode temp = head;
		while(temp != null){
			System.out.print(temp.getData());
			temp = temp.next;
			if(temp!=null){
				System.out.print("->");
			}
		}
		System.out.println("");
	}
	
	public boolean isEmpty()
	{
		if(head == null) return true;
		else return false;
	}
}
