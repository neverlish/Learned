package ch04;

public class VIPCustomer extends Customer {
	double saleRatio;
	private String agentID;
	
	public VIPCustomer(int customerID, String customerName) {
		super(customerID, customerName);
		bonusRatio = 0.05;
		saleRatio = 0.1;
		customerGrade = "VIP";
	}
	
	@Override
	public int calcPrice(int price) {
		bonusPoint += price * bonusRatio;
		price -= (int)(price * saleRatio);
		return price;
	}

	public String getAgentID() {
		return agentID;
	}
	
}
