package exercise1008;

import java.util.Scanner;

//Page241 **7.34
public class CharSort {
  public static void main(String[] args) {
    Scanner input = new java.util.Scanner(System.in);
    
    // Input
    System.out.print("Enter string: ");
    String str = input.next();
    
    String res = sort(str);
    
    // Output
    System.out.println("Result: " + res);
  }
  
  public static String sort (String s) {
	char[] str = s.toCharArray();
	for(int i = 0; i < str.length - 1;i ++) {
	  for(int j = 0; j < str.length - 1 - i; j ++) {
		if(str[j] > str[j + 1]) {
		  char temp = str[j];
		  str[j] = str[j + 1];
		  str[j + 1] = temp;
		}
	  }
	}
	String res = String.valueOf(str);
	
	return res;
  }
}
