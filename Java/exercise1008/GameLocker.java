package exercise1008;

//Page239 **7.23
public class GameLocker {
  public static void main(String[] args) {
    boolean[] locker = new boolean[100];
    int len = locker.length;
    
    // Initialize
    for(int i = 0;i < len;i ++) 
      locker[i] = false;
    
    //Change
    for(int j = 0;j < len;j ++) {
      locker[j] = !locker[j];  
      for(int k = j + j + 1;k < len;k += j + 1) { 
    	locker[k] = !locker[k];
      }
    }
    
    //Output
    System.out.print("Reslut:");
    for(int i = 0;i < len;i ++) {
      if(locker[i]) {
    	System.out.print(" " + (i + 1));
      }
    }
    System.out.println();
  }
}
