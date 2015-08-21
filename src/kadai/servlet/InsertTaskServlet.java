package kadai.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpSession;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.arnx.jsonic.*;

import kadai.beans.*;
/**
 * Servlet implementation class InsertTaskServlet
 */
@WebServlet("/InsertTaskServlet")
public class InsertTaskServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InsertTaskServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		//TODO:taskCategoryIdをちゃんとセットする。※今は固定値。
		Kadai one = new Kadai(2, request.getParameter("userid"),request.getParameter("title"),4,"TEST01");
		TaskList list = new TaskList();
		
		try {
			one.entry();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		list.load(one.getUserid(),"");
//		request.setAttribute("one", one);
//		request.setAttribute("list", list);
//		request.getRequestDispatcher("kadailist.jsp").forward(request, response);
		
		//JSON形式で値を返す
		response.setContentType("application/json; charset=UTF-8");
//		response.setContentType("text/plain; charset=UTF-8");
//		response.setContentType("text/html); charset=UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:8800");
		PrintWriter out = response.getWriter();
		String str = JSON.encode(one);
		out.println(str);
		System.out.println(str);

	}
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
