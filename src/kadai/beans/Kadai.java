/**
 * 
 */
package kadai.beans;

import java.sql.*;
import kadai.util.*;

/**
 * @author tomoko ushijima
 *
 */
public class Kadai {
	
	private int     id;
	private String  userid;
	private String  title;
	private int     sortid;
	
	//SQL　用
	Connection conn; 
	
	DBUtil dbutil;
	
	/**
	 * コンストラクタ１：JSP用
	 */
	
	public Kadai(){
		
	}
	
	/**
	 * コンストラクタ２：Bean生成用
	 * @param id
	 * @param userid
	 * @param title
	 * @param sortid
	 */
	public Kadai(int id, String userid, String title, int sortid) {
		super();
		this.id = id;
		this.userid = userid;
		this.title = title;
		this.sortid = sortid;
		
	}
	
	public void opendb (){
		
		try {
			
			
			try {
				Class.forName("com.mysql.jdbc.Driver").newInstance();
			} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
			this.conn = DriverManager.getConnection("jdbc:mysql://localhost/test","test1","test1");
			System.out.println("OK");

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	private void closedb() throws SQLException{
		this.conn.close();
	}
	
	/**
	 *  DBに登録する
	 * @throws Exception 
	 */
	public void entry() throws Exception{
		
		this.opendb();
		
		this.dbutil = new DBUtil();

		this.dbutil.getConn();
		
		Statement stmt = this.conn.createStatement();
		String sql = "insert into tasks (userid,title) values ('" + this.getUserid()+"','"+ this.getTitle() + "') ";
		System.out.println(sql);
		stmt.executeUpdate(sql);
		
		this.closedb();
		
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getSortid() {
		return sortid;
	}
	public void setSortid(int sortid) {
		this.sortid = sortid;
	}

}
