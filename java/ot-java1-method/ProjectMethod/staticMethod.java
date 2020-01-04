class Print{
    public String delimiter;
    public void a() {
        System.out.println(this.delimiter);
        System.out.println("a");
        System.out.println("a");
    }
    public void b() {
        System.out.println(this.delimiter);
        System.out.println("b");
        System.out.println("b");
         
    }
    public static void c(String delimiter) {
        System.out.println(delimiter);
        System.out.println("b");
        System.out.println("b");
    }
}
public class staticMethod {
     
    public static void main(String[] args) {
//      Print.a("-");
//      Print.b("-");
         
        // instance
        Print t1 = new Print();
        t1.delimiter = "-";
        t1.a();
        t1.b();
        Print.c("$");
         
         
//      Print.a("*");
//      Print.b("*");
         
        Print t2 = new Print();
        t2.delimiter = "*";
        t2.a();
        t2.b();
    }
     
 
}