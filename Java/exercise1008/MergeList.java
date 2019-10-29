package exercise1008;

import java.util.Scanner;

//Page241 
public class MergeList {
  public static void main(String[] args) {
	Scanner input = new java.util.Scanner(System.in);
	
	// Input
	System.out.print("Enter list1: ");
	int len1 = input.nextInt();
	int[] list1 = new int[len1];
	for(int i = 0;i < len1;i ++)
	  list1[i] = input.nextInt();

	System.out.print("Enter list2: ");
	int len2 = input.nextInt();
	int[] list2 = new int[len2];
	for(int i = 0;i < len2;i ++)
	  list2[i] = input.nextInt();
	
	list1 = sort(list1);
	list2 = sort(list2);

	int[] list = merge(list1, list2);
	
	// Output
	System.out.print("The merged list is");
	for(int i = 0; i < len1 + len2;i ++) {
	  System.out.print(" " + list[i]);
	}
	System.out.println();
  }
  
  public static int[] sort (int[] number) {
	for(int i = 0;i < number.length - 1;i ++) {
	  for(int j = 0;j < number.length - 1 - i;j ++) {
		if(number[j] > number[j + 1]) {
		  int temp = number[j];
		  number[j] = number[j + 1];
		  number[j + 1] = temp;
		}
	  }
	}
	return number;
  }
  
  public static int[] merge(int[] list1, int[] list2) {
	int len1 = list1.length;
	int len2 = list2.length;
	int len = len1 + len2;
	int a = 0; /*list1 index*/
	int b = 0; /*list2 index*/
	int c = 0; /*list index*/
	int[] list = new int[len];
	
	while(a != len1 && b != len2) {
	  if(list1[a] > list2[b]) {
		list[c] = list2[b];
		b ++;
		c ++;
	  }else {
		list[c] = list1[a];
		a ++;
		c ++;
	  }
	}
	if(a + 1 != len1) {
	  for(int t = a; t < len1; t ++) {
		list[c] = list1[t];
		c ++;
	  }
	}else {
	  for(int t = b; t < len2; t ++) {
		list[c] = list2[t];
		c ++;
	  }	  
	}
	return list;
  }
}
