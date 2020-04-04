package honux.calendar;

import java.util.Scanner;

public class Prompt {
	public int parseDay(String week) {
		if (week == "su") return 0;
		else if (week.equals("mo")) return 1;
		else if (week.equals("tu")) return 2;
		else if (week.equals("wd")) return 3;
		else if (week.equals("th")) return 4;
		else if (week.equals("fr")) return 5;
		else if (week.equals("sa")) return 6;
		else
			return 0;
	}
	
	public void runPrompt() {
		Scanner scanner = new Scanner(System.in);
		Calendar cal = new Calendar();
		
		int month = 0;
		int year = 2017;
		
		while (true) {
			System.out.println("년도를 입력하세요");
			System.out.println("YEAR> ");
			year = scanner.nextInt();
			System.out.println("달을 입력하세요");
			System.out.println("MONTH> ");
			month = scanner.nextInt();
			
			if (month == -1) {
				break;
			}
			if (month > 12) {
				continue;
			}
			cal.printCalendar(year, month);
		}
		
		System.out.println("Bye~");
		scanner.close();
	}
	
	public static void main(String[] args) {
		Prompt p = new Prompt();
		p.runPrompt();
	}

}
