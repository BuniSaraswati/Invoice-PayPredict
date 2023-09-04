package com.crud;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.connection.Admin;
import com.model.InvoiceManagement;

/**
 * Servlet implementation class DataFetching
 */
@WebServlet("/DataFetching")
public class DataFetching extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	 private Admin admin;
	    public DataFetching() {
	        super();
	    }
	 
	    public void init() {
	        String jdbcURL = "jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
	        String jdbcUsername = "root";
	        String jdbcPassword = "Buni@123";
	 
	        admin = new Admin(jdbcURL, jdbcUsername, jdbcPassword);
	 
	    }
	    
	    protected void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException{
	        String action = request.getServletPath();
	 
	        try {
	            switch (action) {
	            case "/columns":
	            	getColumns(request,response);
	            	break;
	            default:
	                listRow(request, response);
	                break;
	            }
	        } catch (SQLException ex) {
	            throw new ServletException(ex);
	        }
	    }
	       
	    private void listRow(HttpServletRequest request, HttpServletResponse response)
	            throws SQLException, IOException, ServletException {
	        ArrayList<InvoiceManagement> listrow;
	//**
	        
	        
			try {
				//rows fetched from database as arraylist of object
				listrow = admin.FetchAllRows();
				//we map into key value pair and store in another arraylist
				ArrayList<Map<String,String>> al=new ArrayList<>();
				for(int i=0;i<listrow.size();i++) {
					Map<String,String> map=new HashMap<>();
					map.put("sl_no",String.valueOf(listrow.get(i).getSl_no()));
					map.put("business_code",String.valueOf(listrow.get(i).getBusiness_code()));
					map.put("cust_number",String.valueOf(listrow.get(i).getCust_number()));
					map.put("clear_date",String.valueOf(listrow.get(i).getClear_date()));
					map.put("buisness_year",String.valueOf(listrow.get(i).getBuisness_year()));
					map.put("doc_id",String.valueOf(listrow.get(i).getDoc_id()));
					map.put("name_customer", String.valueOf(listrow.get(i).getName_customer()));
					map.put("posting_date",String.valueOf(listrow.get(i).getPosting_date()));
					map.put("document_create_date",String.valueOf(listrow.get(i).getDocument_create_date()));
					map.put("document_create_date1",String.valueOf(listrow.get(i).getDocument_create_date1()));
					map.put("due_in_date",String.valueOf(listrow.get(i).getDue_in_date()));
					map.put("invoice_currency",String.valueOf(listrow.get(i).getInvoice_currency()));
					map.put("document_type",String.valueOf(listrow.get(i).getDocument_type()));
					map.put("posting_id",String.valueOf(listrow.get(i).getPosting_id()));
					map.put("area_business",String.valueOf(listrow.get(i).getArea_business()));
					map.put("total_open_amount",String.valueOf(listrow.get(i).getTotal_open_amount()));
					map.put("baseline_create_date",String.valueOf(listrow.get(i).getBaseline_create_date()));
					map.put("cust_payment_terms",String.valueOf(listrow.get(i).getCust_payment_terms()));
					map.put("invoice_id",String.valueOf(listrow.get(i).getInvoice_id()));
					map.put("isOpen",String.valueOf(listrow.get(i).getIsOpen()));
					map.put("aging_bucket",String.valueOf(listrow.get(i).getAging_Bucket()));
					map.put("is_deleted",String.valueOf(listrow.get(i).getIs_deleted()));
					al.add(map);
				}
				System.out.print(listrow.get(2).getClear_date());
				PrintWriter writer=response.getWriter();
				JSONObject obj=new JSONObject();
				//key value is converted into json using jsonObject()
				obj.put("list", al);
				response.setHeader("Access-Control-Allow-Origin", "*");
	            response.setContentType("application/json");
	            response.setCharacterEncoding("UTF-8");
				response.setStatus(200);
				writer.append(obj.toString());
				writer.close();
			} catch (SQLException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}

	    }
	    //get columns
	    private void getColumns(HttpServletRequest request, HttpServletResponse response)
	    {
		 try {
				ArrayList<String> colList=admin.GetColumns();
				for(var col :colList) {
					System.out.println(col);
				}
				PrintWriter writer=response.getWriter();
				JSONObject obj=new JSONObject();
				obj.put("list", colList);
				response.setStatus(200);
				writer.append(obj.toString());
				writer.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
	   }

	}