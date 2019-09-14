package test;

import java.util.Scanner;

//Page37 - list2-4
public class ComputeAreaWuthConstant {
	public static void main(String[] args) {
		final double PI = 3.14159; // Declare a constant
		
		//Create a Scanner object
		Scanner input = new Scanner(System.in);
		
		//Prompt the usr to enter a radius
		System.out.print("Enter a number for radius: ");
		double radius = input.nextDouble();
		
		//Compute area
		double area = radius * radius * PI;
		
		//Display result
		System.out.println("The area for the circle of radius " +
		  radius + " is " + area);
	}
}
