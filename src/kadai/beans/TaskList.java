package kadai.beans;

import java.util.*;

public class TaskList {
	
	ArrayList list = new ArrayList();
	
	public TaskList(){
		
	}
	
	public TaskList(ArrayList list){
		this.list = list;
	}

	public ArrayList getList() {
		return list;
	}


	public void setList(ArrayList list) {
		this.list = list;
	}
	
	public void set(Kadai task){
		this.list.add(task);
	}
	

}
