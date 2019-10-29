package exercise1029;

import java.util.Scanner;

//Page308 9.13
public class LocationTest {
  public static void main(String[] args) {
	Scanner input = new Scanner(System.in);
	
	System.out.print("Enter the number of rows and columns in the array: ");
    int rowNum = input.nextInt();
    int columnNum = input.nextInt();
    double[][] a = new double[rowNum][columnNum];
    
    System.out.println("Enter the array:");
    for(int i = 0;i < rowNum;i ++) {
      for(int j = 0;j < columnNum;j ++) {
    	a[i][j] = input.nextDouble();
      }
    }
    
    Location res = Location.locateLargest(a);
    
    System.out.println("The location of the largest element is " + res.maxValue + " at (" + res.getRow() + ", " + res.getColumn() + ")");
  }
}
