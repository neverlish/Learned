package org.springframework.samples.petclinic.proxy;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StoreTest {
	@Test
	public void testPay() {
		CashPerf cashPerf = new CashPerf();
		Store store = new Store(cashPerf);

		store.buySomething(100);
	}
}
