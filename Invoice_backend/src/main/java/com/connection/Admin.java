package com.connection;
import java.sql.*;
import com.model.InvoiceManagement;
import java.util.ArrayList;
import java.util.Date;


public class Admin {
	private String jdbcURL;
    private String jdbcUsername;
    private String jdbcPassword;
    private Connection jdbcConnection;
    
    public Admin(String jdbcURL ,String jdbcUsername,String jdbcPassword){

    	this.jdbcURL = "jdbc:mysql://localhost:3306/grey_goose?zeroDateTimeBehavior=convertToNull";
        this.jdbcUsername = "root";
        this.jdbcPassword = "Buni@123";
    }

	// create connection
	protected void connect() throws Exception {
		if (jdbcConnection == null || jdbcConnection.isClosed()) {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver"); 
				
			}catch (ClassNotFoundException e) {
	            throw new SQLException(e);
			}
			jdbcConnection = DriverManager.getConnection(this.jdbcURL,this.jdbcUsername,this.jdbcPassword);
	   }
	}
	
	// close connection
	protected void disconnect() throws SQLException {
        if (jdbcConnection != null && !jdbcConnection.isClosed()) {
            jdbcConnection.close();
        }
    }
	
	//count no of rows for inserting data automatically into next row
	public int CountRows() throws SQLException {
		ResultSet rs;
		try {
			String sql = "SELECT COUNT(*) AS rowcount FROM winter_internship";
			connect();
			Statement ps = jdbcConnection.createStatement();
			rs = ps.executeQuery(sql);
			rs.next();
			int rowCount=rs.getInt("rowcount");
			rs.close();
			ps.close();
			disconnect();
			return rowCount;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		} finally {
			if (jdbcConnection != null) {
				disconnect();
			}
		}
	}
	
	//get sl_no for new entries
	public int getLastSlNo() throws SQLException {
		ResultSet rs;
		try {
			String sql = "SELECT sl_no as rowcount FROM `winter_internship` ORDER BY sl_no DESC LIMIT 1;";
			connect();
			Statement ps = jdbcConnection.createStatement();
			rs = ps.executeQuery(sql);
			rs.next();
			int rowCount=rs.getInt("rowcount");
			rs.close();
			ps.close();
			disconnect();
			return rowCount;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		//it executes whether exception occurs or not so that connection gets closed
		finally {
			if (jdbcConnection != null) {
				disconnect();
			}
		}
	}

	// add data
	public int InsertRow(InvoiceManagement obj) throws Exception {
		int i = 0;
		try {
			String sql = "INSERT INTO winter_internship(sl_no,business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,document_create_date1,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,isOpen,aging_bucket,is_deleted) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			connect();
			PreparedStatement ps = jdbcConnection.prepareStatement(sql);
			ps.setInt(1, obj.getSl_no());
			ps.setString(2, obj.getBusiness_code());
			ps.setInt(3, obj.getCust_number());
			ps.setDate(4, (java.sql.Date) obj.getClear_date());
			ps.setInt(5, obj.getBuisness_year());
			ps.setString(6, obj.getDoc_id());
			ps.setDate(7, (java.sql.Date) obj.getPosting_date());
			ps.setDate(8, (java.sql.Date) obj.getDocument_create_date());
			ps.setDate(9, (java.sql.Date) obj.getDocument_create_date1());
			ps.setDate(10, (java.sql.Date) obj.getDue_in_date());
			ps.setString(11, obj.getInvoice_currency());
			ps.setString(12, obj.getDocument_type());
			ps.setInt(13, obj.getPosting_id());
			ps.setString(14, obj.getArea_business());
			ps.setDouble(15, obj.getTotal_open_amount());
			ps.setDate(16, (java.sql.Date) obj.getBaseline_create_date());
			ps.setString(17, obj.getCust_payment_terms());
			ps.setInt(18, obj.getInvoice_id());
			ps.setInt(19, 0);
			ps.setString(20, null);
			ps.setInt(21, 0);
			i = ps.executeUpdate();
			ps.close();
			disconnect();
			return i;

		} catch (Exception e) {
			e.printStackTrace();
			return i;
		} finally {
			if (jdbcConnection != null) {
				disconnect();
			}
		}
	}
	
	
	//array list of columns
	public ArrayList<String> GetColumns() throws SQLException, Exception{
		ResultSet rs = null;
		try {
			String sql = "SELECT * FROM WINTER_INTERNSHIP ORDER BY sl_no DESC LIMIT 10;";
			connect();
			PreparedStatement ps = jdbcConnection.prepareStatement(sql);
			rs = ps.executeQuery();
			ArrayList<String> columns=new ArrayList<>();
			ResultSetMetaData rsMetaData=rs.getMetaData();
            int count = rsMetaData.getColumnCount();
            for(int i = 1; i<=count; i++) {
               columns.add(rsMetaData.getColumnName(i));
            }
			ps.close();
	        disconnect();
			return columns;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			if (jdbcConnection != null) {
		        disconnect();
			}
		}
	}

	// fetch all rows from the database(1 row == 1 obj)
	public ArrayList<InvoiceManagement> FetchAllRows() throws SQLException, Exception {
		 ArrayList<InvoiceManagement> rowlist = new ArrayList<>();
		ResultSet rs = null;
		try {
			String sql = "SELECT * FROM winter_internship inner join customer on winter_internship.cust_number = customer.cust_number order by sl_no DESC";
			connect();
			PreparedStatement ps = jdbcConnection.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				int sl_no=rs.getInt("sl_no");
				String business_code=rs.getString("business_code");
		    	int cust_number=rs.getInt("cust_number");
		    	Date clear_date=rs.getDate("clear_date");
		    	int buisness_year=rs.getInt("buisness_year");
		        String doc_id=rs.getString("doc_id");
		        Date posting_date=rs.getDate("posting_date");
		        Date document_create_date=rs.getDate("document_create_date");
		        Date document_create_date1=rs.getDate("document_create_date1");
		        Date due_in_date=rs.getDate("due_in_date");
		    	String invoice_currency=rs.getString("invoice_currency");
		    	String document_type=rs.getString("document_type");
		    	int posting_id=rs.getInt("posting_id");
		    	String area_business=rs.getString("area_business");
		    	Double total_open_amount=rs.getDouble("total_open_amount");
		    	Date baseline_create_date=rs.getDate("baseline_create_date");
		    	String cust_payment_terms=rs.getString("cust_payment_terms");
		    	int invoice_id=rs.getInt("invoice_id");
		    	int isOpen=rs.getInt("isOpen");
		    	String aging_bucket=rs.getString("aging_bucket");
		    	int is_deleted=rs.getInt("is_deleted");
		    	String name_customer = rs.getString("name_customer");
	             
	            InvoiceManagement row = new InvoiceManagement(business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,document_create_date1,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id/**aging_bucket,isOpen,,is_deleted**/);
	            row.setSl_no(sl_no);
	            row.setName_customer(name_customer);
	            row.setIsOpen(isOpen);
	            row.setAging_Bucket(aging_bucket);
	            row.setIs_deleted(is_deleted);
	            rowlist.add(row);
	        }
	        rs.close();
			ps.close();
	        disconnect();
	        return rowlist;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			if (jdbcConnection != null) {
		        disconnect();
			}
		}
	}

	//fetch  single row*
	public  ResultSet FetchRow(InvoiceManagement obj) throws SQLException, Exception {
		ResultSet rs = null;
		try {
			String sql = "SELECT business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,document_create_date1,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,isOpen,aging_bucket,is_deleted FROM winter_internship WHERE sl_no=?";
			connect();
			PreparedStatement ps = jdbcConnection.prepareStatement(sql);
			ps.setInt(1, obj.getSl_no());
			rs = ps.executeQuery();
			ps.close();
			disconnect();
			return rs;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			if (jdbcConnection != null) {
				disconnect();
			}
		}
	}

	// update row fields
	public int updateRow(InvoiceManagement obj, int flag)
			throws SQLException, Exception {
		int i = 0;
		try {
			
			String sql;
			if (flag == 1)
				sql = "UPDATE winter_internship SET invoice_currency=?,cust_payment_terms=? WHERE sl_no=?";
			else
				sql = "UPDATE winter_internship SET aging_bucket=? WHERE sl_no=?";
			connect();
			PreparedStatement ps = jdbcConnection.prepareStatement(sql);
			
			if(flag == 1) {
				ps.setString(1, obj.getInvoice_currency());
				ps.setString(2, obj.getCust_payment_terms());
				ps.setInt(3, obj.getSl_no());
				i = ps.executeUpdate();
			}
			else {
				ps.setString(1, obj.getAging_bucket());
				ps.setInt(2, obj.getSl_no());
				i = ps.executeUpdate();
			}
			ps.close();
			disconnect();
			return i;
		} catch (Exception e) {
			e.printStackTrace();
			jdbcConnection.rollback();
			return 0;
		} finally {
			if (jdbcConnection != null) {
				disconnect();
			}
		}
	}

	// delete
	public int deleteRow(InvoiceManagement obj) throws SQLException, Exception {
		int i = 0;
		try {
			String sql = "DELETE FROM winter_internship WHERE sl_no=?";
			connect();
			PreparedStatement ps = jdbcConnection.prepareStatement(sql);
			ps.setInt(1, obj.getSl_no());
			i = ps.executeUpdate();
			ps.close();
			disconnect();
			return i;
		} catch (Exception e) {
			e.printStackTrace();
			jdbcConnection.rollback();
			return 0;
		} finally {
			if (jdbcConnection != null) {
				disconnect();
			}
		}
	}
		
	


}
