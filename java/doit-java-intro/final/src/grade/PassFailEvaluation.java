// Pass/Fail 학점 클래스 구현

package grade;

public class PassFailEvaluation implements GradeEvaluation {
	@Override
	public String getGrade(int point) {
		if (point >= 70 && point <= 100)
			return "P";
		else 
			return "F";
	}
}
