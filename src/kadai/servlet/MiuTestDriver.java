package kadai.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.arnx.jsonic.JSON;
import net.arnx.jsonic.JSONException;

/**
 * Servlet implementation class MiuTestDriver
 */
@WebServlet("/MiuTestDriver")
public class MiuTestDriver extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final String REQUEST_ACTION = "requestAction";	// アクション名
	private final String REQUEST_PARAM = "requestParam";	// アクションのパラメーター
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MiuTestDriver() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String action = request.getParameter(REQUEST_ACTION);
		String param = request.getParameter(REQUEST_PARAM);
		
		try {
			// アクション名で処理を振り分ける
			switch (action) {	// nullだとNullPointerExceptionとなるらしい
				case "getUserInfo":
					kadai.beans.RequestUserInfo info = JSON.decode(param, kadai.beans.RequestUserInfo.class);
					System.out.println(info.getMessage());

					// テスト用レスポンスデータを作成し、返す
					String responseJson = "{\"arrayUserInfo\" : \"hogehoge\"}";
					response.setContentType("application/json;charset=UTF-8");
					PrintWriter out = response.getWriter();
					out.print(responseJson);
					break;
			}
		} catch (NullPointerException e) {
		} catch (JSONException e) {
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
