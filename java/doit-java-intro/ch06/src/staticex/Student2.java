// serialNum의 get(), set() 메서드 사용하기

package staticex;

public class Student2 {
	private static int serialNum = 1000;
	public int studentID;
	public String studentName;
	public int grade;
	public String address;
	
	public Student2() {
		serialNum++;
		studentID = serialNum;
	}
	
	public String getStudentName() {
		return studentName;
	}
	
	public void setStudentName(String name) {
		studentName = name;
	}

	public static int getSerialNum() {
		int i = 10;
//		studentName = "이지원";
		return serialNum;
	}
	
	public static void serialNum(int serialNum) {
		Student2.serialNum = serialNum;
	}
}
