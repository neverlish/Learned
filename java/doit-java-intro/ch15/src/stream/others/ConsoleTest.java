// Console 테스트하기

package stream.others;

import java.io.Console;

public class ConsoleTest {
	public static void main(String[] args) {
		Console console = System.console();
		
		System.out.println("이름:");
		String name = console.readLine();
		System.out.println("직업:");
		String job = console.readLine();
		System.out.println("비밀번:");
		char[] pass = console.readPassword();
		
		System.out.println(name);
		System.out.println(job);
		System.out.println(pass);

	}

}
