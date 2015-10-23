package kadai.beans;

import kadai.util.DBUtil;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class UserInfo {
	
	public UserInfo(){
		
	}
	
	int i=0;
	String userId ="";
	String userName="";

	/**
	 * ログイン関数　-- ユーザIDを渡す
	 * @param userId
	 * @param password
	 * @return
	 */
	public boolean login(String userId,String password){
		
		this.userId = userId;
		
		return login();
	}
	
	/**
	 * ログイン関数 --　本体
	 * @return
	 */
	public boolean login(){
		
		//値の異常を確認する
		if(userId == null){
			return false;
		}
		
		try{
			Class.forName("com.mysql.jdbc.Driver");
			DBUtil dbutil = new DBUtil();
//			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/list", "co", "testest");
			Connection conn = dbutil.getConn();

			ResultSet rs;
			String sql = "select * from list.userinfo ";
			sql +=  " where userid = \'" + this.userId + "\'";
			
			Statement stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			
			while(rs.next()){
				
				System.out.println(rs.getString("userid"));
				
				
				
			}
			
			conn.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		//TODO:ちゃんとした認証処理にする
		if(userId.equals("yamada")){
			return true;
		}
		
		return false;
		
	}

	//getter と setter
	
	public int getI() {
		return i;
	}

	public void setI(int i) {
		this.i = i;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	
	

}
