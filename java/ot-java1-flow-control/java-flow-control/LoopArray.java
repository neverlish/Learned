
public class LoopArray {

	public static void main(String[] args) {
		/*
         *  <li>egoing</li>
         *  <li>jinhuck</li>
         *  <li>youbin</li>
         */
         
        String[] users = new String[3];
        users[0] = "egoing";
        users[1] = "jinhuck";
        users[2] = "youbin";
         
        for(int i=0; i<users.length; i++) {
            System.out.println(users[i]+",");
        }

	}

}
