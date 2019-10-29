package exercise1015;

//Page294 list9-10
public class TestPassObject {
	public static void main(String[] args) {
		//Create a Circle object with radius
		CircleWithPrivateDataFieldS myCircle = 
			new CircleWithPrivateDataFieldS(1);
		
		int n = 5;
		printAreas(myCircle, n);
		
		System.out.println("\n" + "Radius is " + myCircle.getRadius());
		System.out.println("n is " + n);
	}
	
	public static void printAreas(
		CircleWithPrivateDataFieldS c, int times) {
	    System.out.println("Radius \t\tArea");
	    while(times >= 1) {
	      System.out.println(c.getRadius() + "\t\t" + c.getArea());
	      c.setRadius(c.getRadius() + 1);
	      times --;
	    }
	}

}
