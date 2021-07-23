package ch24;

public class StudentSubjectTest {

	public static void main(String[] args) {
		Student studentLee = new Student(10001, "Lee");
		
		studentLee.addSubject("국어", 100);
		studentLee.addSubject("수학", 50);
		
		Student studentKim = new Student(10002, "Kim");
		studentKim.addSubject("국어", 70);
		studentKim.addSubject("수학", 85);
		studentKim.addSubject("영어", 100);
		
		studentLee.showScoreInfo();
		
		System.out.println("============");
		
		studentKim.showScoreInfo();

	}

}
