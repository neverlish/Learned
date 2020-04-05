package honux.calendar;

import java.util.Scanner;

public class Prompt {
	public void printMenu() {
		System.out.println("+----------------------+");
		System.out.println("| 1. 일정 등록          ");
		System.out.println("| 2. 일정 검색           ");
		System.out.println("| 3. 달력 보기");
		System.out.println("| h. 도움말 q. 종료");
		System.out.println("+----------------------+");
	}
	
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
		printMenu();
		
		Scanner scanner = new Scanner(System.in);
		Calendar cal = new Calendar();
		
		while (true) {
			System.out.println("명령(1, 2, 3, h, q)");
			String cmd = scanner.next();
			if (cmd.equals("1")) cmdRegister();
			else if (cmd.equals("2")) cmdSearch();
			else if (cmd.equals("3")) cmdCal(scanner, cal);
			else if (cmd.equals("h")) printMenu();
			else if (cmd.equals("q")) break;
		}
		
		System.out.println("Thank you. Bye~");
		scanner.close();
	}
	
	private void cmdCal(Scanner s, Calendar c) {
		int month = 0;
		int year = 2017;
		
		System.out.println("년도를 입력하세요");
		System.out.println("YEAR> ");
		year = s.nextInt();
		System.out.println("달을 입력하세요");
		System.out.println("MONTH> ");
		month = s.nextInt();
		
		if (month > 12 || month < 1) {
			System.out.println("잘못된 입력입니다.");
			return;
		}
		c.printCalendar(year, month);
		
	}

	private void cmdSearch() {
		// TODO Auto-generated method stub
		
	}

	private void cmdRegister() {
		// TODO Auto-generated method stub
		
	}

	public static void main(String[] args) {
		Prompt p = new Prompt();
		p.runPrompt();
	}

}
