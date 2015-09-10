package kadai.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class MiuTestServlet
 */
@WebServlet("/MiuTestServlet")
public class MiuTestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static class GetUserInfoRequest {
		// public List<String> arrayUserId = null;
		public String userId = null;
	}
	private class MiuRowData {
		public String id = "";
		public List<String> cell = new ArrayList<String>();
		
		public MiuRowData (String id, List<String> cells) {
			this.id = id;
			this.cell = cell;
		}
	}
	private class MiuDataResponse {
		public int total = 30;
		public int page = 3;
		public int records = 600;
		public List<MiuRowData> rows = new ArrayList<MiuRowData>();
	}

    /**
     * @see HttpServlet#HttpServlet()
     */
    public MiuTestServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		// 本当はまず、セッションチェック（ログインチェック）
		
		// カスタムヘッダーからアクション名を取得
		String strAction = request.getHeader("x-custom-action-id");
		if (strAction == null) {
			// アクション名がない：異常
			return;
		}
		
		BufferedReader bufferReaderBody = new BufferedReader(request.getReader());
		String body = bufferReaderBody.readLine();
		
		ObjectMapper mapper = new ObjectMapper();
		
		switch (strAction) {
			case "getUserInfo":
				GetUserInfoRequest requestParam = mapper.readValue(body, GetUserInfoRequest.class);
				System.out.println(requestParam.userId);
				break;
			case "getColumn":
				break;
		}
		
		MiuDataResponse res = new MiuDataResponse();
		for (int i = 0; i < 20; ++i) {
			List<String> cell = new ArrayList<String>();
			cell.add("id" + i);
			cell.add("2015-09-" + i);
			cell.add("name" + i);
			cell.add("note" + i);
			cell.add("amount" + i);
			cell.add("tax" + i);
			cell.add("total" + i);
			res.rows.add(new MiuRowData(String.valueOf(i), cell));
		}
		/*
		res.name = "miura";
		res.score = 123;
		res.yaku.add("neko");
		res.yaku.add("melon");
		*/
		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.print(mapper.writeValueAsString(res));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
