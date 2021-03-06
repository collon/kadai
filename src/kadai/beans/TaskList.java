package kadai.beans;

import java.util.*;
import kadai.util.*;
import java.sql.*;

public class TaskList {
	
	ArrayList list = new ArrayList();
	
	DBUtil dbutil = new DBUtil(); 
	Connection conn;
	
	public TaskList(){
		
	}
	
	public TaskList(ArrayList list){
		this.list = list;
	}
	
	
	public ArrayList getList(String userid) {
		return list;
	}

	public ArrayList getList() {
		return list;
	}

	/** データベースからリストを取得する
	 * 
	 * @return
	 */
	public ArrayList load(String userid) {
		
		ResultSet rs;

		try {

			this.conn = dbutil.getConn();
			
			String sql = "select * from tasks";
			
			Statement stmt = this.conn.createStatement();
			rs = stmt.executeQuery(sql);
			
			while(rs.next()){
				System.out.println(rs.getString("userid") + ":" + rs.getString("title"));
				
				this.list.add(new Kadai(rs.getInt("ID"),rs.getString("userid"),rs.getString("title"),rs.getInt("SORTNO")));

			}
			
			this.conn.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
	}

	public int size(){
		return this.list.size();
	}
	
	public Kadai get(int i){
		return (Kadai)this.list.get(i);
	}
	public void addList(Kadai kadai){
		this.list.add(kadai);
	}

	public void setList(ArrayList list) {
		this.list = list;
	}
	
	public void set(Kadai task){
		this.list.add(task);
	}
	

}
