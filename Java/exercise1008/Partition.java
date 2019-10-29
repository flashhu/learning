package exercise1008;

import java.util.Scanner;

//Page241 **7.32
public class Partition {
    public static void quickSort(int[] arr,int low,int high){
        int i,j,temp,t;
        if(low>high){
            return;
        }
        i=low;
        j=high;
        //temp就是基准位
        temp = arr[low];
 
        while (i<j) {
            //先看右边，依次往左递减
            while (temp<=arr[j]&&i<j) {
                j--;
            }
            //再看左边，依次往右递增
            while (temp>=arr[i]&&i<j) {
                i++;
            }
            //如果满足条件则交换
            if (i<j) {
                t = arr[j];
                arr[j] = arr[i];
                arr[i] = t;
            }
 
        }
        //最后将基准为与i和j相等位置的数字交换
        arr[low] = arr[i];
        arr[i] = temp;
    }
	
  public static void main(String[] args) {
    Scanner input = new java.util.Scanner(System.in);
    
    // Input
    System.out.print("Enter list: ");
    int len = input.nextInt();
    int[] list = new int[len];
    for(int i = 0;i < len;i ++) 
      list[i] = input.nextInt();
    
    quickSort(list, 0, list.length-1);
    System.out.print("After the partition. the list is ");
    for (int i = 0; i < list.length; i++) 
      System.out.print(list[i]+" ");
  }
}
