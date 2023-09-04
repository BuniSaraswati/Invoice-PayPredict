package com.crud;

import java.io.IOException;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connection.Admin;
import com.model.InvoiceManagement;
/**
 * Servlet implementation class DataInsertion
 */
@WebServlet("/DataInsertion")
public class DataInsertion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	 private Admin admin;
	    public DataInsertion() {
	        super();
	    }
	 
	    public void init() {
	        String jdbcURL = "jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
	        String jdbcUsername = "root";
	        String jdbcPassword = "Buni@123";
	 
	        admin = new Admin(jdbcURL, jdbcUsername, jdbcPassword);
	 
	    }
	    
	    public static java.sql.Date FormatDate(String str_date) throws ParseException {
	    	DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date date = dateFormat.parse(str_date);
	    	java.sql.Date sqlDate=new java.sql.Date(date.getTime());
	    	System.out.println(sqlDate);
		    return sqlDate;
	    }
	    
	    protected void doPost(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException{
	 
	        try {
	        	response.setHeader("Access-Control-Allow-Origin", "*");
	            insertRow(request,response);
	        } catch (SQLException | ParseException ex) {
	            throw new ServletException(ex);
	        }
	    }
	       
	    private void insertRow(HttpServletRequest request, HttpServletResponse response)
	            throws SQLException, IOException, ParseException {
	    	//DATA is fetched using get parameter from request object and set into object
	    	String business_code=request.getParameter("business_code");
	    	int cust_number=Integer.parseInt(request.getParameter("cust_number"));
	    	java.sql.Date clear_date=FormatDate(request.getParameter("clear_date"));
	    	int buisness_year = Integer.parseInt(request.getParameter("buisness_year"));
	        String doc_id=request.getParameter("doc_id");
	        java.sql.Date posting_date=FormatDate(request.getParameter("posting_date"));
	        java.sql.Date document_create_date=FormatDate(request.getParameter("document_create_date"));
	        java.sql.Date document_create_date1=FormatDate(request.getParameter("document_create_date"));
	        java.sql.Date due_in_date=FormatDate(request.getParameter("due_in_date"));
	    	String invoice_currency=request.getParameter("invoice_currency");
	    	String document_type=request.getParameter("document_type");
	    	int posting_id=Integer.parseInt(request.getParameter("posting_id"));
	    	String area_business=request.getParameter("area_business");
	    	Double total_open_amount=Double.parseDouble(request.getParameter("total_open_amount"));
	    	java.sql.Date baseline_create_date=FormatDate(request.getParameter("baseline_create_date"));
	    	String cust_payment_terms=request.getParameter("cust_payment_terms");
	    	int invoice_id=Integer.parseInt(request.getParameter("invoice_id"));
	    	System.out.println(buisness_year);


	 
	        InvoiceManagement newRow = new InvoiceManagement(business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,document_create_date1,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id/**,isOpen,aging_bucket,is_deleted**/);
	        
	        newRow.setSl_no(admin.getLastSlNo()+1);
	        try {
				int i=admin.InsertRow(newRow);
				System.out.println(i);
			} catch (Exception e) {
				e.printStackTrace();
			}

	    }

	}