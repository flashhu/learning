package exercise1008;

import java.util.Scanner;

// Page238 **7.19
public class IfSorted {
  public static void main(String[] args) {
	Scanner input = new java.util.Scanner(System.in);
	
    System.out.print("Enter list: ");
    int len = input.nextInt();
    int[] list = new int[len];
    for(int i = 0;i < len;i ++) {
      list[i] = input.nextInt();
    }
    
    boolean jud = isSorted(list);
    if(jud) {
      System.out.println("The list is already sorted");
    } else {
      System.out.println("The list is not sorted");
    }
  }
  
  public static boolean isSorted(int[] list) {
	for(int i = 0;i < list.length - 1;i ++) {
	  if(list[i] > list[i + 1]) {
		return false;
	  }
	}
	return true;
  }
}
