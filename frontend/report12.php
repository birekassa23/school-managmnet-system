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
            margin-left: 40%;
            color: black;
         }
         
         input [type=text]{
              text-align: center;
              margin-left: 70%;
         }
         .button{
           color: whitesmoke;
            font-size: 20px;
             font-family: sans-serif;
              position: absolute;
               margin-left: 2%;
               margin-top: 3%;
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

     .phpStyling{ 
           margin-top: 6%;
          margin-left: 6%;
          font-size: 18px;
     }
    
	 </style>
</head>
<body>
        <h1>HAMAREY BACHCHEY</h1>
         <h1>Student Information</h1>
<pre>
    <form action=" " method="POST">
        <h4>CLASSID        : <input type="text"name="ID" required></h4>
       <button class="button" type="submit" name="submit" value="submit!">Submit!</button>          
</form>
</pre>
</body>
</html>

<div class="phpStyling">
<?php
  error_reporting(0);
    if(isset($_POST['submit']))
    { 
        $CID=$_POST['ID'];  

        $db_sid = "(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) )(CONNECT_DATA = (SID = HusnainOracl)))";         ;            // Your oracle SID, can be found in tnsnames.ora  ((oraclebase)\app\Your_username\product\11.2.0\dbhome_1\NETWORK\ADMIN) 
        $db_user = "scott";   
        $db_pass = "password";    
        $con = oci_connect($db_user,$db_pass,$db_sid); 
        $con = oci_connect($db_user,$db_pass,$db_sid); 
        if($con) {} 
        else 
        {die('Could not connect to Oracle: ');}
         
        $query="select max(classsection.class) as CLASS, max(classsection.section) as SECTION  , count( registration.classsectionid )  as STUDENTCOUNT
from registration
inner join classsection
on registration.classsectionid = $CID
group by registration.classsectionid
order by registration.classsectionid";

        $parsedQuery=oci_parse($con,$query);
         $exceutionResult=oci_execute($parsedQuery);
            while($row=oci_fetch_array($parsedQuery, OCI_BOTH + OCI_RETURN_NULLS))
            {
                $C=$row["CLASS"];
                $SC=$row["STUDENTCOUNT"];
                $S=$row["SECTION"];
          echo"			
    
          <table>
          <tr>
            <td >CLASS:</td>
            <td > $C </td>
          </tr>
          <tr>
            <td >SECTION:</td>
            <td> $S </td>
          </tr>	
          <tr>
            <td >STUDENTCOUNT:</td>
            <td> $SC </td>
          </tr>	
          </table>
          </br>";
				
            }

    }
 ?>
</div>   