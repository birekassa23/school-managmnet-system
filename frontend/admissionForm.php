<!DOCTYPE html>
<html>
<head>
    <meta charset="UTD-8";
    <meta name="viewpoint" content="width=device-width, initial-scale=1.0">
	 <title>Admission Form</title>
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
          .image{
              margin-left: 40%;
              margin-top: -10%;
              padding: 5px;
              color: teal;
          } 
          
     .phpStyling{
        position:fixed;
          overflow: hidden;
          text-align: center;
           width: 240px;
           padding: 25px;
            height: 4x;    
           top: 20%;
          left:40%;
          font-size: 20px;
        color: salmon;    
         border: 1px whitesmoke; 
         cursor: auto;
    }
  
	 </style>
</head>
<body>
        <h1>HAMAREY BACHCHEY</h1><h1>STUDENT ADMISION FORM</h1>
    <form action=" " method="POST">
    <pre>
    <h2>Student Information:</h2><h4>Name            : <input type="text" name="student" required> 
        <h4>Date Of Birth   : <input type="text"name="DOB"required>
        <h4>Gender          : <input type="text"name="Gender" required></h4>
      <div class="image">
         <input type="file" name="img" onchange="url(this)" accept="image/*" required>
      </div>	
      <hr><h2>Parents Information</h2><h4>Father Name      : <input type="text"name="fatherName" required>      Mother Name    : <input type="text"name="motherName" required>
       <h4>Father Contact   : <input type="text" name="fatherContact" maxlength="11" required placeholder="11 Digit Number">      Mother Contact : <input type="text"name="motherContact"maxlength="11" required placeholder="11 Digit Number">
       <h4>Father CNIC      : <input type="text" maxlength="13" name="fatherCNIC" required>      Mother` CNIC    : <input type="text" maxlength="13" name="motherCNIC" required>
       <h4>Father Address   : <input type="text" name="fatherAddress" required >      Mother Address : <input type="text"name="motherAddress" required>
       <h4>Father E-mail    : <input type="email"name="fatherEmail" placeholder="****@gmail.com"required>      Mother E-mail  : <input type="email" placeholder="****@gmail.com"  name="motherEmail" required></h4>
       <hr><h2>Guardian Information</h2><h4>Guardian Name    : <input type="text"name="guardianName" required>
        <h4>Guardian Contact : <input type="text"name="guardianContac"maxlength="11" required placeholder="11 Digit Number">
        <h4>Guardian CNIC    : <input type="text"name="guardianCNIC" required maxlength="13">
        <h4>Guardian Gender  : <input type="text"name="guardianGender" required>
        <h4>Relation         : <input type="text"name="guardianRelation" required></h4>
       <hr><h1>For Staff Only</h1><h4>Fee Amount          : <input type="text"name="fee">
       <h4>Discount            : <input type="text"name="discount">
       <h4>Final Amount        : <input type="text"name="finalFee">
       <h4>Fully Paid          : <input type="radio" name="paid" value="YES" />YES    <input type="radio" name="paid" value="NO" />NO
       <h4>Reason for Discount : <input type="text"name="reason"></h4>
       <button class="button" type="submit" name="submit" value="submit!">Submit!</button><br><hr>          
</pre>
</form>
</body>
</html>

<div class="phpStyling">
<?php
  # error_reporting(0);
   if(isset($_POST['submit']))
   {
     $db_sid = "(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) )(CONNECT_DATA = (SID = HusnainOracl)))";         ;            // Your oracle SID, can be found in tnsnames.ora  ((oraclebase)\app\Your_username\product\11.2.0\dbhome_1\NETWORK\ADMIN) 
		   $db_user = "scott";   
		    $db_pass = "password";    
		     $con = oci_connect($db_user,$db_pass,$db_sid); 
		      if($con) {} 
               else{die('Could not connect to Oracle!'); }
        $studentDOB=$_POST['DOB']; $NameS=$_POST['student']; $studentGender=$_POST['Gender']; $studentImage=$_POST['img'];
        $fatherName = $_POST['fatherName']; $fatherCNIC=$_POST['fatherCNIC']; $fatherContact=$_POST['fatherContact'];
        $fatherAddress=$_POST['fatherAddress']; $fatherEmail=$_POST['fatherEmail'];        
        $motherName = $_POST['motherName']; $motherCNIC=$_POST['motherCNIC']; $motherContact=$_POST['motherContact'];
        $motherAddress=$_POST['motherAddress']; $motherEmail=$_POST['motherEmail'];
        $guardianName = $_POST['guardianName']; $guardianCNIC=$_POST['guardianCNIC']; $guardianContact=$_POST['guardianContac'];
        $guardianGender=$_POST['guardianGender']; $guardianRelation=$_POST['guardianRelation'];
        $fee=$_POST['fee'];$discount=$_POST['discount']; $reason=$_POST['reason'];$paid;
        if(isset($_POST['paid'])=='YES'){$paid=1;}
        else if(isset($_POST['paid'])=='NO'){$paid=0;}
      
#**************************************Generating the Primary Keys for Parent, Guardian*********************************************#        
         $guad="SELECT MAX(guardianid)+1 as gmaximum from guardian";
           $guadParse=oci_parse($con,$guad);
            $exceutionResult=oci_execute($guadParse);
             $row = oci_fetch_array($guadParse); 
              $maximumGuard = $row[0];
               #echo "Maximum Guard ".$maximumGuard;
                $parent="SELECT max(parentid)+1 as pmaximum from parent";
                 $parentParse=oci_parse($con,$parent);
                  $exceutionResult=oci_execute($parentParse);
                   $rowParent = oci_fetch_array( $parentParse); 
                    $maximumParent = $rowParent[0];
                   #echo "Maximum Parent ".$maximumParent;
                  $student="SELECT max(studentid)+1 as smaximum from student";
                $studentParse=oci_parse($con,$student);
               $exceutionResult=oci_execute( $studentParse);
             $rowStudent = oci_fetch_array($studentParse); 
            $maximumStudent = $rowStudent[0];
          #echo "Maximum Student ".$maximumStudent;
          $student="SELECT max(voucherno)+1 as smaximum from fee";
          $studentParse=oci_parse($con,$student);
         $exceutionResult=oci_execute( $studentParse);
       $rowVoucher = oci_fetch_array($studentParse); 
      $voucherNo = $rowVoucher[0];

#***************************************Getting System Date**********************************************************************
          
        $student="SELECT sysdate from dual";
         $studentParse=oci_parse($con,$student);
          $exceutionResult=oci_execute( $studentParse);
           $rowStudent = oci_fetch_array($studentParse); 
            $systemDate = $rowStudent[0];
             #echo "System Date ".$systemDate;

#***********************************This will check if any sibling of new admission already in School************
           $query="SELECT * from Parent where (FATERCNIC='$fatherCNIC' AND MOTHERCNIC='$motherCNIC')";
            $parsedQuery=oci_parse($con,$query);
             $exceutionResult=oci_execute($parsedQuery);
              $numofRows=oci_fetch_all($parsedQuery,$numofRows);
              if($numofRows>0)
              {
                  $query="SELECT * from Parent where (FATHERPHONENO='$fatherContact' AND MOTHERPHONENO='$motherContact' AND FATERCNIC='$fatherCNIC' AND MOTHERCNIC='$motherCNIC')";
                  $parsedQuery=oci_parse($con,$query);
                  $exceutionResult=oci_execute($parsedQuery);
                  $numofRows2=oci_fetch_all($parsedQuery,$numofRows2);

                if($numofRows==0)
                  {
                      echo "Your CNICs are incorrect!";
                  }
                else if($numofRows>0)
                  {
                       #this queray gets the parent primary key beacause this admission is a sibiling of a student
                        $guad="SELECT parentid from parent where FATHERPHONENO='$fatherContact' AND MOTHERPHONENO='$motherContact' AND FATERCNIC='$fatherCNIC' AND MOTHERCNIC='$motherCNIC'";
                        $guadParse=oci_parse($con,$guad);
                        $exceutionResult=oci_execute($guadParse);
                        $row = oci_fetch_array($guadParse); 
                        $parentIDExisting = $row[0];
                      #Simply insert data now
                      if($row[0]!=NULL)
                      {
                          $query="INSERT into guardian values('$maximumGuard','$guardianName','$guardianContact','$guardianCNIC','$guardianGender','$systemDate')";
                          $parsedQuery=oci_parse($con,$query);
                          $exceutionResult1=oci_execute($parsedQuery);
                        if($exceutionResult1) 
                         {
                           
                            $query="INSERT into fee(VOUCHERNO , fee ,discount, discountreason,EDATE,fullypaid) values('$voucherNo','$fee','$discount','$reason','$systemDate','$paid')";
                            $parsedQuery=oci_parse($con,$query);
                            $exceutionResult3=oci_execute($parsedQuery);
                            if(!$exceutionResult){echo "Fee walay ki insertion maslay!";}

                             $query="INSERT into student(NAME , gender , DOB, EDATE, studentid , parentid, guardianid, relationwithguardian) values('$NameS','$studentGender','$studentDOB','$systemDate','$maximumStudent','$parentIDExisting','$maximumGuard','$guardianRelation')";
                             $parsedQuery=oci_parse($con,$query);
                             $exceutionResult3=oci_execute($parsedQuery);
                             if($exceutionResult3)
                             {
                               echo "Congratulations! Admission Granted."."<br>";
                             }
                             else if(!$exceutionResult3)
                             {
                               echo "Unsuccessfull Insertion Review you information!"."<br>";
                             }
                          }         
                       else if(!$exceutionResult) #Unique constraint on GuardianCNIC will through an error
                         { 
                            echo "Every student needs his own Guardian.The Guardian CNIC exists in our database!"."<br>";
                         }      
                     }
                     
                    else if($row[0]==NULL){   echo "Either your child is a student of Hamaray Bachay(other info is incorrect), else your CNICs are incorrect!";}
                }                   
                    
              }
#**************************************If he is the first child of his family***************************              
              else
              {  
                  $query="INSERT into guardian values('$maximumGuard','$guardianName','$guardianContact','$guardianCNIC','$guardianGender','$systemDate')";
                   $parsedQuery=oci_parse($con,$query);
                    $exceutionResult1=oci_execute($parsedQuery);
                    if($exceutionResult1) 
                    {
                      $query="INSERT into parent values('$maximumParent','$motherCNIC','$motherName','$systemDate','$motherEmail','$motherAddress','$motherContact','$fatherCNIC','$fatherName','$fatherAddress','$fatherContact','$fatherEmail')";
                        $parsedQuery=oci_parse($con,$query);
                         $exceutionResult2=oci_execute($parsedQuery);
                          if($exceutionResult2){}
                           else{echo"Problem in Parent Data!";}
                  

                           $query="INSERT into fee(VOUCHERNO , fee ,discount, discountreason,EDATE,fullypaid) values('$voucherNo','$fee','$discount','$reason','$systemDate','$paid')";
                           $parsedQuery=oci_parse($con,$query);
                          $exceutionResult3=oci_execute($parsedQuery);
                          if(!$exceutionResult){echo "Fee walay ki insertion maslay!";}
                           $query="INSERT into student(NAME , gender , DOB, EDATE, studentid , parentid, guardianid, relationwithguardian) values('$NameS','$studentGender','$studentDOB','$systemDate','$maximumStudent','$maximumParent','$maximumGuard','$guardianRelation')";
                           $parsedQuery=oci_parse($con,$query);
                          $exceutionResult3=oci_execute($parsedQuery);
                      if($exceutionResult3){echo "Congratulations! Admission Granted."."<br>";}
                    else if(!$exceutionResult3){echo "Unsuccessfull Insertion Review you information!"."<br>";
                   }
                    else #Unique constraint on GuardianCNIC will through an error
                    {
                      oci_error($con);
                     echo "Every student needs his own Guardian.The Guardian CNIC exists in our database!"."<br>";
                    }
              }
    }
  }
?>
</div>