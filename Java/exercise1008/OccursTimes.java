package exercise1008;

import java.util.Scanner;

//Page236 **7.3
public class OccursTimes {
  public static void main(String[] args) {
	Scanner input = new java.util.Scanner(System.in);
	int[] time = new int[101];
	
	//Initialize the time
	for(int i = 0;i < time.length;i ++)
	  time[i] = 0;
	
	//Input
	System.out.print("Enter the integers between 1 and 100: ");
    int index = 1;
    while(index != 0) {
      index = input.nextInt();
      time[index]  = time[index] + 1;
    }
    
    //Output
    for(int i = 1;i < time.length;i ++) {
      if(time[i] == 1) {
    	System.out.println(i + " occurs " + time[i] + " time");
      } else if(time[i] > 1) {
    	System.out.println(i + " occurs " + time[i] + " times"); 
      }
    }   
  }
}
