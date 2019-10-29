package exercise1029;

//Page308 9.13
public class Location {
  public int row;
  public int column;
  public double maxValue;
  
  public Location() {
	row = 0;
	column = 0;
	maxValue = 0; 
  }
  
  public int getRow() {
	return row;
  }
  
  public int getColumn() {
	return column;
  }
  
  public static Location locateLargest (double[][] a) {
	Location test = new Location();
	//行数
	int rowNum = a.length;
	//列数
	int coluNum = a[0].length;
	
	for(int i = 0;i < rowNum;i ++) {
	  for(int j = 0;j < coluNum;j ++) {
		if(a[i][j] > test.maxValue) {
		  test.maxValue = a[i][j];
		  test.row = i;
		  test.column = j;
		}
	  }
	}
	return test;
  }
}


