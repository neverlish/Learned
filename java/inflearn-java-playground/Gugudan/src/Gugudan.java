public class Gugudan {
	public static void main(String[] args) {
		int[] result = new int[9];
		for (int i = 0; i < result.length; i++) {
			result[i] = 2 * (i + 1);
		}
		for (int i = 0; i < result.length; i++) {
			System.out.println(result[i]);
		}
		
		int[] times3 = new int[9];
		
		for (int i = 0; i < times3.length; i++) {
			times3[i] = 3 * (i + 1);
		}
		for (int i = 0; i < result.length; i++) {
			System.out.println(times3[i]);
		}
		
		int[] times4 = new int[9];
		
		for (int i = 0; i < times3.length; i++) {
			times4[i] = 4 * (i + 1);
		}
		for (int i = 0; i < result.length; i++) {
			System.out.println(times4[i]);
		}
	}
}
