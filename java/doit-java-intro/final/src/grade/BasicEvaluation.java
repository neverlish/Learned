// 일반 과목 학점 정책 클래스

package grade;

public class BasicEvaluation implements GradeEvaluation {
	@Override
	public String getGrade(int point) {
		String grade;
		
		if (point >= 90 && point <= 100)
			grade = "A";
		else if (point >= 80)
			grade = "B";
		else if (point >= 70)
			grade = "C";
		else if (point >= 55)
			grade = "D";
		else
			grade = "F";
		
		return grade;
	}
}
