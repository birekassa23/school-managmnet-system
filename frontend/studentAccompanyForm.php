<!DOCTYPE html>
<html>
<head>
    <meta charset="UTD-8";
    <meta name="viewpoint" content="width=device-width, initial-scale=1.0">
	 <title>Student Accompany Form</title>
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
         <h1>Student Accompanying FORM</h1>
<pre>
    <form action=" " method="POST">
	   <h2>Student Information:</h2>
        <h4>ID     : <input type="text"name="S_ID" required>
        <h4>Name   : <input type="text"name="name"required>
        <h4>Class  : <input type="text"name="Class" required></h4>
		<hr>
	   <h2>Accompanying Guardian Information:</h2>
        <h4>ID                         : <input type="text"name="G_ID" required>
        <h4>Name                       : <input type="text"name="G_name"required>
		<h4>Pregnant                   : <input type="radio" name="Pregnant" value="YES" />YES    <input type="radio" name="Pregnant" value="NO" />NO 						
        <h4>Reason for Parents Absence : <input type="text"name="RoPA" required class="ChatBox"></h4>
       <button class="button" type="submit" name="submit" value="submit!">Submit!</button>          
</form>
</pre>
</body>
</html>


<?php
         if(isset($_POST['Login']))
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
	
			$SID = $_POST["S_ID"];
			$SName = $_POST['name'];
			$Class = $_POST["Class"];
			$GID = $_POST["G_ID"];
            $GName = $_POST["G_name"];
            $RPA = $_POST["RoPA"];

            $sa="SELECT COALESCE(max(specialaccompanyid),0)+1 as smaximum from specialaccompany";
                $saParse=oci_parse($con,$sa);
               $exceutionResult=oci_execute( $saParse);
	 if($exceutionResult){  
             $row_sa= oci_fetch_array($saParse); 
            $max = $row_sa[0];

            $date="SELECT sysdate from dual";
                $dateParse=oci_parse($con,$date);
               $exceution=oci_execute( $dateParse);
             $row_date= oci_fetch_array($dateParse); 
            $d = $row_date[0];
		
		
		$query="insert into specialaccompany values($max,$SID,$GID,'$RPA','$d')";	
		$query_id = oci_parse($con, $query); 		
        $r = oci_execute($query_id);
		if($r)
		{
			echo "INSERTED SUCCESSFULLY";
		}
        }
    }
?>
	