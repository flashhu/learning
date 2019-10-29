package exercise1015;

//Page298 list9-11
public class TotalArea {
	public static void main(String[] args) {
		CircleWithPrivateDataFieldS[] circleArray;
		
        circleArray = createCircleArray();
        
        printCircleArray(circleArray);
	}
	
	public static CircleWithPrivateDataFieldS[] createCircleArray() {
		CircleWithPrivateDataFieldS[] circleArray = 
			new CircleWithPrivateDataFieldS[5];
		
		for(int i = 0; i < circleArray.length; i++) {
		  circleArray[i] =
			new CircleWithPrivateDataFieldS(Math.random() * 100);
		}
		
		return circleArray;
	}

	public static void printCircleArray(
		CircleWithPrivateDataFieldS[] circleArray) {
		System.out.printf("%-30s%-15s\n", "Radius", "Area");
		for (int i = 0;i < circleArray.length;i ++) {
		    System.out.printf("%-30f%-15f\n", circleArray[i].getRadius(),
		    	circleArray[i].getArea());
		}
		
		System.out.println("--------------------------------------------");
		
		System.out.printf("%-30s%-15f\n", "The total area of circles is",sum(circleArray));
	}
	
	public static double sum(CircleWithPrivateDataFieldS[] circleArray) {
		double sum = 0;
		
		for(int i = 0;i < circleArray.length;i ++)
			sum += circleArray[i].getArea();
		
		return sum;
	}
}
