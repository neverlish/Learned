package ch19;

public class CoffeeTest {

	public static void main(String[] args) {
		Coffee etopiaCoffee = new EtopiaAmericano();
		etopiaCoffee.brewing();
		
		System.out.println();
		Coffee etopiaLatte = new Latte(etopiaCoffee);
		etopiaLatte.brewing();
		
		System.out.println();
		Coffee mochaEtopia = new Mocha(etopiaCoffee);
		mochaEtopia.brewing();
		
		System.out.println();
		WhippingCream kenyaCoffee = new WhippingCream(new Mocha(new Latte( new KenyaAmericano())));
		kenyaCoffee.brewing();

	}

}
