package exercise1119;

import java.util.Scanner;

//Page382 11.16
public class AddTest {
  public static void main(String[] args) {
	int number1 = (int)(Math.random() * 10);
	int number2 = (int)(Math.random() * 10);
	int[] num = new int[21];
	
    for(int i = 0;i < 21;i ++) {
      num[i] = 0;
    }
    
    Scanner input = new Scanner(System.in);
    
    System.out.print(
      "What is " + number1 + " + " + number2 + "?");
    int answer = input.nextInt();
    
    while(number1 + number2 != answer) {
      num[answer] += 1;
      if(num[answer] <= 1) {
    	System.out.print("Wrong answer" + " "); 
      }else {
    	System.out.println("You already entered " + answer);
      }
      num[0] = answer;
      System.out.print(
    	"What is " + number1 + " + " + number2 + "?");
      answer = input.nextInt();
    }
    System.out.print("You got it!");
  }
}
