package ch02;

public class VIPCustomer extends Customer {
	double saleRatio;
	private String agentID;
	
	public VIPCustomer() {
		bonusRatio = 0.05;
		saleRatio = 0.1;
		customerGrade = "VIP";
	}

	public String getAgentID() {
		return agentID;
	}
	
}
