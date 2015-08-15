package kadai.servlet;

import java.util.ArrayList;
import java.util.List;

import kadai.beans.MiuTestResponse;

public class MiuTestService {
	public MiuTestResponse test01 () {
		MiuTestResponse res = new MiuTestResponse();
		res.strHoge = "hogehoge";
		res.numHoge = 12345;
		res.nameList = new ArrayList<String>();
		res.nameList.add("総務太郎");
		res.nameList.add("経理花子");
		
		
		res.setHogeList(0, "user01", "user02", "user03");
		res.setHogeList(1, "富士山", "カンチェンジュンガ", "アンナプルナ");
		res.setHogeList(2);
		
		return res;
	}
}