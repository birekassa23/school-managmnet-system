<HTML>
	<HEAD>
	</HEAD>
	<Body>
	 <?php
        $db_sid ="(DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST =localhost)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = orcl)
    )
  )";
        $db_user = "scott";   // Oracle username e.g "scott"
        $db_pass = "4298111";    // Password for user e.g "1234"
        $con = oci_connect($db_user,$db_pass,$db_sid); 
        if($con) 
			{	
				echo "Oracle Connection Successful.<br>";
			} 
        else 
            { die('Could not connect to Oracle: '); }
    ?>
        <br>
		<hr>
 	
	<?php
				$CID = $_POST["ID"];
        $query="select student.NAME as STUDENT, classsection.CLASS as CLASS , classsection.SECTION as SECTION, (select guardian.name 
                                                                                              from guardian 
                                                                                              where guardianid = student.guardianid ) as  GUARDIAN
from parent 
inner join student
on parent.parentid = student.parentid
inner join registration
on registration.studentid = student.studentid
inner join classsection
on classsection.classsectionid = registration.classsectionid
and (fathername = '$CID' or mothername = '$CID')";

			$parsedQuery=oci_parse($con,$query);
			$exceutionResult=oci_execute($parsedQuery);
            while($row=oci_fetch_array($parsedQuery, OCI_BOTH + OCI_RETURN_NULLS))
            {
                $St=$row["STUDENT"];
                $C=$row["CLASS"];
                $S=$row["SECTION"];
                $G=$row["GUARDIAN"];
          echo"			
    
          <table>
          <tr>
            <td >Child Name:</td>
            <td > $St </td>
          </tr>
          <tr>
            <td >SECTION:</td>
            <td> $S </td>
          </tr>	
          <tr>
            <td >CLASS:</td>
            <td> $C </td>
          </tr>	
          <tr>
          <tr>
            <td >Guardian Name:</td>
            <td > $G </td>
          </tr>
            <td >--------------------------------</td>
          </tr>	
          </table>
          </br>";
                
            }
	
		
	?>
	
	</Body>
	
</HTML>