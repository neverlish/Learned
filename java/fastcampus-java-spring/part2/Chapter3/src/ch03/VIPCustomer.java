package ch03;

public class VIPCustomer extends Customer {
	double saleRatio;
	private String agentID;
	
	public VIPCustomer(int customerID, String customerName) {
		super(customerID, customerName);
		bonusRatio = 0.05;
		saleRatio = 0.1;
		customerGrade = "VIP";
		
		System.out.println("VIPCustomer(int, string) call");
	}

	public String getAgentID() {
		return agentID;
	}
	
}
