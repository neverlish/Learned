// FileWriter로 쓰기

package stream.reader;

import java.io.FileWriter;
import java.io.IOException;

public class FileWriterClass {
	public static void main(String[] args) {
		try (FileWriter fw = new FileWriter("writer.txt")) {
			fw.write('A');
			
			char buf[] = {'B', 'C', 'D', 'E', 'F', 'G'};
			fw.write(buf);
			fw.write(buf, 1, 2);
			fw.write("65");
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("출력이 완료되었습니다.");

	}

}
