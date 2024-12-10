<!DOCTYPE html>
<html>
<head>
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
              background-color:salmon;
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
        <h1>HAMAREY BACHCHEY</h1>
         <h1>Class Assignment FORM</h1>
<pre>
    <form action="" method="POST">
        <h4>Student ID        : <input type="text"name="ID" required>
        <h4>Current Class     : <input type="text"name="CC"required>
        <h4>New Class         : <input type="text"name="NC" required>
        <h4>Reason for change : <input class="ChatBox" type="text"name="RoC" required>
        <h4>Approved By       : <input type="text"name="Approve_By" required></h4>
       <button class="button" type="submit" name="submit" value="submit!">Submit!</button>          
</form>
</pre>
</body>
</html>


    <?php

	
    if(isset($_POST['submit']))
    { 
        
       $db_sid = "(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) )(CONNECT_DATA = (SID = HusnainOracl)))";         ;            // Your oracle SID, can be found in tnsnames.ora  ((oraclebase)\app\Your_username\product\11.2.0\dbhome_1\NETWORK\ADMIN) 
       $db_user = "scott";   // Oracle username e.g "scott"
       $db_pass = "password";    // Password for user e.g "1234"
       $con = oci_connect($db_user,$db_pass,$db_sid); 
       if($con) 
         {	
             echo "Oracle Connection Successful.<br>";
         } 
        else 
         { die('Could not connect to Oracle: '); }
			$SID = $_POST["ID"];
			$current = $_POST['CC'];
			$new = $_POST["NC"];
			$reason = $_POST["RoC"];

            $sa="SELECT COALESCE(max(sectionchangeid),0)+1 as smaximum from sectionchange";
                $saParse=oci_parse($con,$sa);
               $exceutionResult=oci_execute( $saParse);
             $row_sa= oci_fetch_array($saParse); 
            $max = $row_sa[0];
			
            $date="SELECT sysdate from dual";
                $dateParse=oci_parse($con,$date);
               $exceution=oci_execute( $dateParse);
             $row_date= oci_fetch_array($dateParse); 
            $d = $row_date[0];
		
		
		$query="insert into sectionchange values($max,$SID,'$d','$reason','$new','$current')";	
		$query_id = oci_parse($con, $query); 		
        $r = oci_execute($query_id);
		$query1="update registration set classsectionid='$new' where studentid=$SID";
		$query_id1 = oci_parse($con, $query1); 		
        $r1 = oci_execute($query_id1);
		if($r1)
		{
			echo "INSERTED SUCCESSFULLY";
		}
    }	
	?>
	