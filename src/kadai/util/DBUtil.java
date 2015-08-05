package kadai.util;

import java.sql.*;

public class DBUtil {
	
	private static final DBUtil instance = new DBUtil();
	
	private Connection conn;
	
	private String dbname="jdbc:mysql://localhost/test";
	private String user="test1";
	private String passwd="test1";
	
	public DBUtil() {
	
	}
	
	public Connection getConn(){
		
		//jdbcƒhƒ‰ƒCƒo
		try {
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
		return this.instance;
	}
	

}
