class Foo {
	public static String classVar = "I class var";
    public String instanceVar = "I instance var";
    public static void classMethod() {
        System.out.println(classVar); // Ok
//      System.out.println(instanceVar); // Error
    }
    public void instanceMethod() {
        System.out.println(classVar); // Ok
        System.out.println(instanceVar); // Ok
    }
}


public class StaticApp {

	public static void main(String[] args) {
		System.out.println(Foo.classVar); // OK
//      System.out.println(Foo.instanceVar); // Error
        Foo.classMethod();
//      Foo.instanceMethod();
         
        Foo f1 = new Foo();
        Foo f2 = new Foo();
//      
        System.out.println(f1.classVar); // I class var
        System.out.println(f1.instanceVar); // I instance var
//      
        f1.classVar = "changed by f1";
        System.out.println(Foo.classVar); // changed by f1
        System.out.println(f2.classVar);  // changed by f1
//      
        f1.instanceVar = "changed by f1";
        System.out.println(f1.instanceVar); // changed by f1
        System.out.println(f2.instanceVar); // I instance var

	}

}
