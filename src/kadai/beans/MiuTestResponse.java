package kadai.beans;

import java.util.ArrayList;
import java.util.List;

public class MiuTestResponse {

	private class hoge01 {
		public int id = -1;
		public List<String> names = null;
		public hoge01 (int id) {
			this.id = id;
		}
		public hoge01 (int id, List<String> names) {
			this.id = id;
			this.names = names;
		}
		public void addName(String name) {
			if (this.names == null) {
				this.names = new ArrayList<String>();
			}
			this.names.add(name);
		}
	}
	
	public String strHoge;
	public int numHoge;
	public String initDef = "initialize";
	public List<String> nameList;
	public List<hoge01> hogeList = new ArrayList<hoge01>();
	
	public void setHogeList (int id, String... names) {
		hoge01 hoge = new hoge01(id);
		for (String s : names) {
			hoge.addName(s);
		}
		hogeList.add(hoge);
	}
}