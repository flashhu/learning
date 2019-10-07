package exercise0924;

import java.util.Scanner;

//Page214 list7-1
public class AnalyzeNumbers {
  public static void main(String[] args) {
	Scanner input = new Scanner(System.in);
	System.out.print("Enter the number of items: ");
    int n = input.nextInt();
    double[] numbers = new double[n];
    double sum = 0;
    
    System.out.print("Enter the numbers: ");
    for(int i = 0;i < n;i ++) {
      numbers[i] = input.nextDouble();
      sum += numbers[i];
    }
    
    double average = sum / n;
    
    int count = 0; // The number of elements above average
    for (int i = 0; i < n;i ++) 
      if (numbers[i] > average)
    	count++;
    
    System.out.println("Average is " + average);
    System.out.println("Number of elements above the average is "
      + count);
    input.close();
  } 
}
