package kadai.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kadai.beans.*;
import net.arnx.jsonic.*;

// TODO add commment

/**
 * Servlet implementation class ListServlet
 */
@WebServlet("/ListServlet")
public class ListServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	private static final String ACTIONID_AUTH="login";
	private static final String ACTIONID_TOP="top";
	
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ListServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		//JSON形式で値を返す
		response.setContentType("application/json; charset=UTF-8");
		PrintWriter out = response.getWriter();
		
		//カスタムヘッダーに希望するアクションがセットされている
		String requestCode = request.getHeader("x-custom-action-id");

		//何もない時は空文字に変える
		if(requestCode == null){
			requestCode = "";
		}
		
		//TODO:デバッグ用
		System.out.println(request.getHeader("x-custom-action-id"));
		
		UserInfo user = null;
		
		//ログイン
		if (requestCode.equals(ListServlet.ACTIONID_AUTH)){
			
			user = new UserInfo();
			
			System.out.println("userId:" + request.getParameter("userId"));
			System.out.println("password:" + request.getParameter("password"));
			
			if(user.login(request.getParameter("userId"),request.getParameter("password")) == true ){
				
				System.out.println("login success");
				
				String str;
				str = JSON.encode(user); 
				System.out.println(str);
				out.println(str);

			}else{
				
				System.out.println("login faiture.");
			}
			
			System.out.println(request.getParameter("userId"));
			
			

		}else if(requestCode.equals(ListServlet.ACTIONID_TOP)){
			
		}
				
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
