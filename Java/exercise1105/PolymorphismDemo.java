package exercise1105;

//Page360 list11-5
public class PolymorphismDemo {
  /** main method*/
  public static void main(String[] args) {
	//Display circle and rectangel properties
	displayObject(new CircleFromSimpleGeometricObject(1, "red", false));
	displayObject(new RectangleFromSimpleGeometricObject(1,1,"black",true));
  }
  
  /** Display geometric object properties*/
  public static void displayObject(SimpleGeometricObject object) {
	System.out.println("Created on " + object.getDateCreated() +
		".Color is " + object.getColor());
  }
}
