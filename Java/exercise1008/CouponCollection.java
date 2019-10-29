package exercise1008;

//Page239 **7.24
public class CouponCollection {
  public static void main(String[] args) {
	boolean flag = false;//是否继续抽牌标志位
	boolean[] huaSe = new boolean[4];//花色标志位，抽到过为true
	int count = 0;//抽取次数计数
	
	//抽牌，直到四种花色都抽到为止
	while (!flag) {
	  if (huaSe[0] && huaSe[1] && huaSe[2] && huaSe[3])
		flag = true;
	  else {
		switch (choosePai(huaSe)) {
		  case "Spades":
			huaSe[0] = true;
			break;
		  case "Hearts":
			huaSe[1] = true;
		    break;
		  case "Diamonds":
			huaSe[2] = true;
			break;
		  case "Clubs":
			huaSe[3] = true;
			break;
		  }
		  count++;
	  }
	}
	System.out.println("Number of picks: "+count);
  }
  public static String choosePai(boolean[]huaSe){
	int[] deck = new int[52];
	String[] suits = {"Spades","Hearts","Diamonds","Clubs"};
	String[] ranks = {"Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"};
	for(int i = 0;i < deck.length;i++)
	  //将数组deck初始化
	  deck[i] = i;
	  //洗牌，即数组随机乱序
	  for(int i = 0;i < deck.length;i++){
		int index = (int)(Math.random()*deck.length);
		int temp = deck[i];
		deck[i] = deck[index];
		deck[index] = temp;
	  }
	  //模拟抽牌
	  int i = (int)(Math.random()*52);
	  String suit = suits[deck[i] / 13];
	  String rank = ranks[deck[i] % 13];
	  //判断此张牌是否打印出来
	  switch(suit){
	    case "Spades":
		  if(!huaSe[0])
		    {System.out.println(rank+" of "+suit);huaSe[0] = true;}
		  break;
	    case "Hearts":
		  if(!huaSe[1])
			{System.out.println(rank+" of "+suit);huaSe[1] = true;}
		  break;
		case "Diamonds":
		  if(!huaSe[2])
			{System.out.println(rank+" of "+suit);huaSe[2] = true;}
		  break;
		case "Clubs":
		  if(!huaSe[3])
			{System.out.println(rank+" of "+suit);huaSe[3] = true;}
		  break;
		}
		//返回花色
		return suit;
  }
}
