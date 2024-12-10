<html>

<head>
<title>Database connection </title>
    <meta charset="UTD-8";
    <meta name="viewpoint" content="width=device-width, initial-scale=1.0">
	 <title>Class Assignment Form</title>
     <link rel="icon" href="q2.png" type="image/x-icon">
     <style>
	 	body{
            background-color: whitesmoke;
	 		padding: 0px;
	 		color: salmon;
	 		text-align: center;
             margin-left: 8%;
             margin-right: 8%;
	 	}
         h1{
             text-align: center;
         }
	 	h2{
	 		text-align: left;
	 	}
         h4{
            text-align: left;
            margin-left: 10%;
            color: black;
         }
         
         input [type=text]{
              text-align: center;
         }
         .button{
           color: whitesmoke;
            font-size: 20px;
             font-family: sans-serif;
              position: absolute;
               left: 40%;
               width: 170px;
              padding: 10px;
              background-color:teal;
             cursor: pointer;
             border-radius: 30px;
            }
			.ChatBox{
				 width: 400px;
				 height: 100px;
			}
	 </style>
</head>



<body>
<?php  

$db_sid = "(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) )(CONNECT_DATA = (SID = HusnainOracl)))";         ;            // Your oracle SID, can be found in tnsnames.ora  ((oraclebase)\app\Your_username\product\11.2.0\dbhome_1\NETWORK\ADMIN) 
$db_user = "scott";   
 $db_pass = "password";    
$con = oci_connect($db_user,$db_pass,$db_sid); 

$con = oci_connect($db_user,$db_pass,$db_sid);
if($con)
{
  echo "connection successful.";
}
else
{
    die('Could not connect: ');
}
// $con = oci_connect($db_user,$db_pass,$db_sid);            // Your oracle SID, can be found in tnsnames.ora  ((oraclebase)\app\Your_username\product\11.2.0\dbhome_1\NETWORK\ADMIN) 
  
   // $db_user = "scott";   // Oracle username e.g "scott"
   // $db_pass = "aaaa";    // Password for user e.g "1234"
  
      $SID = $_POST['ID'];
  
      $q="select fathername,mothername from parent where parentid=(select parentid from student where studentid=$SID)";

echo"     <h2>Parents</h2>
     "; 


        $query_id = oci_parse($con, $q);
			$row = oci_execute($query_id);
		while($row = oci_fetch_array($query_id, OCI_BOTH+OCI_RETURN_NULLS)) 
      	  {
            $f_name = $row["FATHERNAME"];
			$m_name = $row["MOTHERNAME"];
          echo"			
    
          <table>
          <tr>
            <td >Father:</td>
            <td > $f_name </td>
          </tr>
          <tr>
            <td >Mother:</td>
            <td> $m_name </td>
          </tr>	
          <tr>
          </table>
          </br>";
    
          }
echo"     <h2>Guardian</h2>";
		  
      $q1="select name from guardian where guardianid=(select guardianid from student where studentid=$SID)";
        $query_id1 = oci_parse($con, $q1);
			$row1 = oci_execute($query_id1);
		while($row1 = oci_fetch_array($query_id1, OCI_BOTH+OCI_RETURN_NULLS)) 
      	  {
            $g_name = $row1["NAME"];
          echo"			
    
          <table>
          <tr>
            <td >Guardian Name:</td>
            <td > $g_name </td>
          </tr>
          </table>
          </br>";
    
          }   
echo"     <h2>Siblings</h2>";
		  
      $q2="select Name from student where parentid=(select parentid from student where studentid=$SID) and studentid<>$SID";
        $query_id2 = oci_parse($con, $q2);
			$row2 = oci_execute($query_id2);
		while($row2 = oci_fetch_array($query_id2, OCI_BOTH+OCI_RETURN_NULLS)) 
      	  {
            $s_name = $row2["NAME"];
          echo"			
    
          <table>
          <tr>
            <td > $s_name </td>
          </tr>
          </table>
          </br>";
    
          }   
echo"     <h2>Class History</h2>";
      $q3="select NEWSECTION,OLDSECTION,EDATE from sectionchange where studentid=$SID";
        $query_id3 = oci_parse($con, $q3);
			$row3 = oci_execute($query_id3);
		while($row3 = oci_fetch_array($query_id3, OCI_BOTH+OCI_RETURN_NULLS)) 
      	  {
            $ns = $row3["NEWSECTION"];
            $os = $row3["OLDSECTION"];
            $dt = $row3["EDATE"];

          echo"			
    
          <table>
          <tr>
            <td > NEWSECTION: </td>			
            <td > $ns </td>
          </tr>
          <tr>
            <td > OLDSECTION: </td>
            <td > $os </td>
          </tr>
          <tr>
            <td > DATE: </td>
            <td > $dt </td>
          </tr>
          </table>
          </br>";
    
          }   
			

  ?>
<hr>
</body>
</html>