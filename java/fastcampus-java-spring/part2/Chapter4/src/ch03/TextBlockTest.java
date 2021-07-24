package ch03;

public class TextBlockTest {

	public static void main(String[] args) {
		String textBlocks = """
				Hello,
				hi,
				how r u""";
		
		System.out.println(textBlocks);
		System.out.println(getBlockHtml());

	}
	
	public static String getBlockHtml() {
		return """
				<html>
					<body>
						<span>Example test</span>
					</body>
				</html>
				""";
	}

}
