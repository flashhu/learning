package exercise1008;

import java.util.Scanner;

//Page236 **7.5
public class DistinctNumber {
  public static void main(String[] args) {
	int[] output = new int[10];
	int len = output.length;
	int temp = 0; /* input number */
	int t = 0; /* output index */
	int jud = 0; /*whether it was found in output */
	int num = 0; /* number of distinct numbers*/
	
	Scanner input = new java.util.Scanner(System.in);
	
	//input
	System.out.print("Enter ten numbers: ");
	while(len -- != 0) {
	  temp = input.nextInt();
	  for(int j = 0;j <= t;j ++) {
        if(temp == output[j]) {
          jud = 1;
          break;
        }
	  }
	  if(jud == 0) {
		output[t] = temp;
		t ++;
		num ++;
	  }
	  jud = 0;
	}
	
	//output
	System.out.println("The number of distinct number is " + num);
	System.out.print("The distinct numbers are:");
	for(int k = 0;k < num;k ++) {
	  System.out.print(" " + output[k]);
	}
	System.out.println();
  }
}
