package kadai.util;

import java.sql.*;

public class DBUtil {
	
	private static final DBUtil instance = new DBUtil();
	
	private Connection conn;
	
	private String dbname="jdbc:mysql://localhost/list";
	private String user="co";
	private String passwd="testest";
	
	public DBUtil() {
	
	}
	
	public Connection getConn(){
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
		
		try {
			conn = DriverManager.getConnection(dbname,user,passwd);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return conn;
	}
	
	public void closeConn(){
		try {
			this.conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public DBUtil getInstance(){
		return DBUtil.instance;
	}
	

}
