package interfaceex;

public interface Sell {
	
	void sell();
	
	default void order(){
		System.out.println("ÆÇ¸Å ÁÖ¹®");
	}
}