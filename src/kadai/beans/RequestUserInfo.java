package kadai.beans;

import java.util.List;

public class RequestUserInfo {
	private List<String> arrayUserId;

	public List<String> getArrayUserId() {
		return arrayUserId;
	}

	public void setArrayUserId(List<String> arrayUserId) {
		this.arrayUserId = arrayUserId;
	}
	
	public String getMessage() {
		String res = "";
		for (String value : arrayUserId) {
			res += value + "¥n";
		}
		return res;
	}
}
