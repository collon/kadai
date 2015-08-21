
package kadai.beans;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;

import kadai.util.DBUtil;

public class TaskCategoryList {

	private ArrayList list=new ArrayList();	
	DBUtil dbutil = new DBUtil(); 
	Connection conn;
	
	public TaskCategoryList(){
		
	}

	public ArrayList getList() {
		return list;
	}

	public void setList(ArrayList list) {
		this.list = list;
	}
	
	public void Add(TaskCategory category){
		list.add(category);
	}
	
	/**
	 * データベースから値を取得する
	 */
	public ArrayList load(){
		
		this.list.clear();
		
		ResultSet rs;

		try {

			this.conn = dbutil.getConn();
			
			String sql = "select * from taskcategory";
			
			Statement stmt = this.conn.createStatement();
			rs = stmt.executeQuery(sql);
			
			while(rs.next()){
				
				System.out.println(rs.getString("userid") + ":" + rs.getString("taskCategoryName"));
				
				this.list.add(new TaskCategory(rs.getString("userid"),rs.getString("taskCategoryName"),rs.getString("taskCategoryId"),rs.getInt("sortId")));

			}
			
			this.conn.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;

		
	}
	
}
