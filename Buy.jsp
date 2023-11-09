<%@ page contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
    <%@page import="java.sql.*,java.util.*"%>
<%
String name=(String)session.getAttribute("uname");
String uname=(String)session.getAttribute("Individual");
   	java.util.Date date=new java.util.Date();
   	String mail=request.getParameter("email");
   	String num=request.getParameter("mobile");
String product=request.getParameter("product");
   	String weight=request.getParameter("weight");
   	String Quantity=request.getParameter("Quantity");
    String f=request.getParameter("Fathername");
    String city=request.getParameter("village");
    String m=request.getParameter("mandal");
    String di=request.getParameter("district");
 String gen=request.getParameter("Gender");
    String pin=request.getParameter("pin");
    String country=request.getParameter("country");
    String dt=date.toString();
out.print("data Inserted successfully");
 try
   {         
        // Writing the message on the web page        
   	
   	Class.forName("oracle.jdbc.driver.OracleDriver");
   	Connection con=DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE","system","Manager");
     	PreparedStatement pst=con.prepareStatement("Insert into Buy_details values(?,?,?,?,?,?,?,?,?,?,?,?,?)");
   	pst.setString(1,uname);
   	//pst.setString(2,pass);
   	pst.setString(2,mail);
   	pst.setString(3,num);
   	pst.setString(4,dt);
    pst.setString(5,m);
    pst.setString(6,city);
    pst.setString(7,di);
 pst.setString(8,product);
    pst.setString(9,weight);
    pst.setString(10,Quantity);
pst.setString(11,gen);
    pst.setString(12,pin);
    pst.setString(13,country);
   	pst.executeUpdate();

%>
<jsp:forward page="suc.html" /> 
<%
response.sendRedirect("suc.html");
   	con.close();
   }
   catch(Exception e)
   {
   	e.printStackTrace();
   }
%>