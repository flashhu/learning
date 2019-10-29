package exercise1029;

//Page307 9.9
public class RegularPolygonTest {
  public static void main(String[] args) {
	RegularPolygon test1 = new RegularPolygon();
	RegularPolygon test2 = new RegularPolygon(6,4);
	RegularPolygon test3 = new RegularPolygon(10,4,5.6,7.8);
	
	double perimeter1 = test1.getPerimeter();
	double perimeter2 = test2.getPerimeter();
	double perimeter3 = test3.getPerimeter();
	
	double area1 = test1.getArea();
	double area2 = test2.getArea();
	double area3 = test3.getArea();	
	
	System.out.println(test1.getN() + " sides, " + "side length is " + test1.getSide());
	System.out.println("Perimeter: " + perimeter1);
	System.out.println("Area: " + area1);
	
	System.out.println(test2.getN() + " sides, " + "side length is " + test2.getSide());
	System.out.println("Perimeter: " + perimeter2);
	System.out.println("Area: " + area2);
	
	System.out.println(test3.getN() + " sides, " + "side length is " + test3.getSide());
	System.out.println("Perimeter: " + perimeter3);
	System.out.println("Area: " + area3);
  }
}
