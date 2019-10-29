package exercise1029;

import java.util.Scanner;

//Page308 9.12
public class LinearEquationTest {
  public static void main(String[] args) {
	//input
	Scanner input = new Scanner(System.in);
	System.out.println("Input (x1,y1) (x2,y2) Example: 0 0 2 2");
	double x1 = input.nextDouble();
	double y1 = input.nextDouble();
	double x2 = input.nextDouble();
	double y2 = input.nextDouble();
	System.out.println("Input (x3,y3) (x4,y4) Example: 0 2 2 0");
	double x3 = input.nextDouble();
	double y3 = input.nextDouble();
	double x4 = input.nextDouble();
	double y4 = input.nextDouble();
	
	
	double a = 1 / (x2 - x1);
	double b = 1 / (y1 - y2);
	double e = x1 / (x2 - x1) - y1 / (y2 - y1);
	
	double c = 1 / (x4 - x3);
	double d = 1 / (y3 - y4);
	double f = x3 / (x4 - x3) - y3 / (y4 - y3);	
	
	LinearEquation calu = new LinearEquation(a, b, c, d, e, f);
	System.out.println("Result: " + "(" + calu.getX() + "," + calu.getY() +")");
  }
}
