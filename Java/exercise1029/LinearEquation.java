package exercise1029;

//Page308 9.12
public class LinearEquation {
  private double a;
  private double b;
  private double c;
  private double d;
  private double e;
  private double f;
  
  public LinearEquation(double a1, double b1, double c1, double d1, double e1, double f1) {
    a = a1;
    b = b1;
    c = c1;
    d = d1;
    e = e1;
    f = f1;
  }
  
  public double getA() {
	return a;
  }
  
  public double getB() {
	return b;
  }
  
  public double getC() {
	return c;
  }
  
  public double getD() {
	return d;
  }
  
  public double getE() {
	return e;
  }
  
  public double getF() {
	return f;
  }
  
  public boolean isSolvable() {
	if(this.a - this.b == 0) {
      return false;
	}else {
	  return true;
	}
  }
  
  public double getX() {
	return (this.e * this.d - this.b * this.f)/(this.a * this.d - this.b * this.c);
  }
  
  public double getY() {
	return (this.a * this.f - this.e * this.c)/(this.a * this.d - this.b * this.c);
  }
}
