// Member 클래스 구현하기

package collection;

public class Member {
	private int memberId;
	private String memberName;
	
	public Member(int memberId, String memberName) {
		this.setMemberId(memberId);
		this.setMemberName(memberName);
	}


	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	@Override
	public String toString() {
		return memberName + " 회원님의 아이디는 " + memberId + "입니다";
	}
}
