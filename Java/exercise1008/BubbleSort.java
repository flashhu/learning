package exercise1008;

import java.util.Scanner;

//Page238 **7.18  ascending
public class BubbleSort {
  public static void main(String[] args) {
	Scanner input = new java.util.Scanner(System.in);
	double[] number = new double[10];
	int len = number.length;
	
	// Input
	System.out.print("Please input ten numbers(double): ");
	for(int i = 0;i < len;i ++) 
	  number[i] = input.nextDouble();
	 
	// Sort
	for(int i = 0;i < len - 1;i ++) {
	  for(int j = 0;j < len - 1 - i;j ++) {
		if(number[j] > number[j + 1]) {
		  double temp = number[j];
		  number[j] = number[j + 1];
		  number[j + 1] = temp;
		}
	  }
	}
	
	// Output
	System.out.print("Reslut:");
	for(int i = 0; i < len;i ++) {
	  System.out.print(" " + number[i]);
	}
	System.out.println();
  }
}
