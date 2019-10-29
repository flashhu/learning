package exercise1015;

//Page293 list9-9
public class TestCircleWithPrivateDataFields {
	public static void main(String[] args) {
		CircleWithPrivateDataFieldS myCircle = 
			new CircleWithPrivateDataFieldS(5.0);
		System.out.println("The area of the circle of radius "
			+ myCircle.getRadius() + " is " + myCircle.getArea());
		
		myCircle.setRadius(myCircle.getRadius() * 1.1);
		System.out.println("The area of the circle of radius "
			+ myCircle.getRadius() + " is " + myCircle.getArea());
		
		System.out.println("The number of objects created is "
			+ CircleWithPrivateDataFieldS.getNumberOfObjects());
	}

}
