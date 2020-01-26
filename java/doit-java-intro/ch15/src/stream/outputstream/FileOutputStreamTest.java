// 파일에 한 바이트씩 출력하기

package stream.outputstream;

import java.io.FileOutputStream;
import java.io.IOException;

public class FileOutputStreamTest {
	public static void main(String[] args) {
		try (FileOutputStream fos = new FileOutputStream("output.txt")) {
			fos.write(65);
			fos.write(66);
			fos.write(67);
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("출력이 완료되었습니다.");
	}
}
