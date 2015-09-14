package kadai.beans;


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
		
		if(userId == null){
			return false;
		}
		
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
