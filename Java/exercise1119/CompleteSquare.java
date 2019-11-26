package System.out;

import java.util.ArrayList;
import java.util.Scanner;

//Page382 11.7
public class CompleteSquare {
  public static void main(String[] args) {
	Scanner input = new Scanner(System.in);
	ArrayList<Integer> list = new ArrayList<>();
	int tmp = 2;
	
	System.out.print("Enter an integer m: ");
	int m = input.nextInt();
	int in = m;
	
	while(m != 1) {
	  if(m % tmp == 0) {
		m = m / tmp;
		list.add(tmp);
	  }else {
		tmp += 1;
	  }
	}
    
	int tmp2 = list.get(0);
	int num = 1;
	int res = 1;
	for(int i = 1;i < list.size();i ++) {
      if(tmp2 == list.get(i)) {
    	num ++;
      }else {
    	if(num % 2 != 0) {
    	  res *= list.get(i - 1);
    	}
    	tmp2 = list.get(i);
    	num = 1;
      }
	}
	if(num % 2 != 0) {
	  res *= list.get(list.size() - 1);
	}
	
	System.out.print("The smallest number n for m * n to be a perfect square is ");
	System.out.println(res);
	
	System.out.print("m * n is ");
	System.out.println(in*res);
  }
}
