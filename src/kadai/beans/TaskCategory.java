/**
 * 
 */
package kadai.beans;

import java.sql.*;

import kadai.util.DBUtil;

/**
 * @author tomoko ushijima
 *
 */
public class TaskCategory {
	
	private String taskCategoryId;
	private String CategoryName;
	private String userid;
	private int sortId;
	
	//SQL　用
	Connection conn; 
	DBUtil dbutil = new DBUtil();

	/**
	 * コンストラクタ
	 */
	public TaskCategory(){
		
	}
	
	public TaskCategory(String userid,String categoryName,String categoryId,int sortId) {
		super();
		taskCategoryId = categoryId;
		CategoryName = categoryName;
		this.userid = userid;
		this.sortId=sortId;
	}

	public TaskCategory(String userid,String categoryName,String categoryId) {
		super();
		taskCategoryId = categoryId;
		CategoryName = categoryName;
		this.userid = userid;
		this.setSortId();
	}

	
	public void entry() throws Exception{
	
		this.conn = this.dbutil.getConn();
		
		Statement stmt = this.conn.createStatement();
		String sql = 
				"insert into taskCategory(" + 
					"taskCategoryId,taskCategoryName,userid,sortid) values ('" +
					this.taskCategoryId + "','" + this.CategoryName + "','" +
					this.getUserid()+"',"+ this.sortId + ") ";
		System.out.println(sql);
		stmt.executeUpdate(sql);
		
		this.conn.close();

	}
	
	private void setSortId(){

		ResultSet rs;

		try {

			this.conn = this.dbutil.getConn();
			
			String sql = "select max(sortId) as 'maxSortId' from taskcategory where " +
						"userid='" + this.userid +"'";
			
			Statement stmt = this.conn.createStatement();
			rs = stmt.executeQuery(sql);
			
			while(rs.next()){
				
				System.out.println(rs.getInt("maxSortId"));
				
			}
			
			this.sortId = rs.getInt("maxSortId")+1;
			
			this.conn.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	//getters and setters
	public String getTaskCategoryId() {
		return taskCategoryId;
	}

	public void setTaskCategoryId(String taskCategoryId) {
		this.taskCategoryId = taskCategoryId;
	}
	public String getCategoryName() {
		return CategoryName;
	}	
	public void setCategoryName(String categoryName) {
		CategoryName = categoryName;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	
	

}
