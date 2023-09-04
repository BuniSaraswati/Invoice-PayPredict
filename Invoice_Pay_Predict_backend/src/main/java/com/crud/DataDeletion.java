package com.crud;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connection.Admin;
import com.model.InvoiceManagement;

/**
 * Servlet implementation class DataDeletion
 */
@WebServlet("/DataDeletion")
public class DataDeletion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private Admin admin;
    public DataDeletion() {
        super();
    }
 
    public void init() {
        String jdbcURL = "jdbc:mysql://localhost:3306/grey_goose";
        String jdbcUsername = "root";
        String jdbcPassword = "Buni@123";
 
        admin = new Admin(jdbcURL, jdbcUsername, jdbcPassword);
 
    }
    
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
        try {
            deleteRow(request,response);
        } catch (Exception ex) {
            throw new ServletException(ex);
        }
    }
       
    private void deleteRow(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    {
    	
	 
	 try {
		 response.setContentType("text/plain");
//		 int id = Integer.parseInt(request.getParameter("sl_no"));
		 String ids = request.getParameter("sl_no");
		 String id_array[]= ids.split(",");
		 System.out.println(ids);
		 for(int i = 0; i < id_array.length; i++) {
			InvoiceManagement row = new InvoiceManagement(Integer.parseInt(id_array[i]));
			int x=admin.deleteRow(row);
			System.out.println(x);

			//**

		 }
			response.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, X-Csrf-Token, WWW-Authenticate, Authorization");
			response.setHeader("Access-Control-Allow-Origin", "*");
		    response.addHeader("Access-Control-Allow-Headers","Content-Type, Authorization");
		    response.addHeader("Access-Control-Allow-Credential", "false");
		    response.addHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

		} catch (Exception e) {
			e.printStackTrace();
		}
    }
    }
}