package kadai.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import kadai.beans.*;
import net.arnx.jsonic.JSON;

/**
 * Servlet implementation class TaskCategoryListServlet
 */
@WebServlet("/TaskCategoryListServlet")
public class TaskCategoryListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static final String def_order_list = "list";
	private static final String def_order_add = "add";
	private static final String def_order_select = "select";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TaskCategoryListServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/json; charset=UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:8800");
		PrintWriter out = response.getWriter();
		/**
		 * タスクリスト上の操作をしていできる。
		 * 　　list ... 一覧をArrayListで返す
		 * 　　add .... 新しいタスク種別を追加する
		 * 　　select ..　選択したタスク種別に紐づくリストを表示する
		 */
		
		String userid = request.getParameter("userid");
		String type = request.getParameter("orderToCategory");
		System.out.println("servlet"+type);
		
		if (type.equals(def_order_select)){

			String taskCategoryId = request.getParameter("taskCatId");
			System.out.println("taskCategoryID:"+taskCategoryId);

			TaskList taskList = new TaskList();
			taskList.load(userid,taskCategoryId);
			
			out.println(JSON.encode(taskList));
		
		} else if(type.equals(def_order_add)){
			
			System.out.println("======================= TEST ===================");
			
			TaskCategory newCat = new TaskCategory(request.getParameter("userid"),
					request.getParameter("catName"),request.getParameter("CatId"));
			
			
		}else{
			
//			TaskCategory cat = new TaskCategory("yamada","TODO List","abc");
			TaskCategoryList list = new TaskCategoryList();
			list.load();		
		
			String str = JSON.encode(list);
			out.println(str);
	
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
