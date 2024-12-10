<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hamaray Bachchey</title>
<link rel="icon" href="q2.png" type="image/x-icon">

<style>
    body{
        font-size: large;
         font-family: 'Times New Roman', Times, serif;
        font-style:normal;
    }
    

    .loginForm{ 
        text-align: justify;
         position:absolute;
          top: 15%;
           left: 60%;
            right: 20%;
           width: 350px;
          height: 420px;
         padding: 5px;
        background: rgba(0,0,0,0.4);
         border: 2px solid salmon; 
    }
 
    .phpStyling{
        position:fixed;
          overflow: hidden;
          text-align: center;
           width: 240px;
            height: 4x;    
           top: 30%;
          left:65%;
          font-size: 18px;
        color: salmon;    
        background: rgba(0,0,0,0.4);
         border: 1px solid red; 
    }
    .loginForm p{
        padding: 0px;
         margin-top: 20px;
          margin-left: 35px;
         color:salmon;
        font-weight: bolder;
    }
   
    h2{
        font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
         color: salmon;
         margin-top: 50px;
        margin-left: 40%;
    }

    input[type=email],input[type=password]{
        text-align: justify;
         width: 80%;
          padding: 10px;
           border: 5px;
          border-color: black;
         font-size:medium;
         resize: horizontal;
        margin-left: 50px;  margin-top: -5px;
    }


    ::placeholder{
	color:coral; 
    }

    .button{
       color: whitesmoke;
        font-size: 20px;
         font-family: sans-serif;
          position: absolute;
           left: 30%;
          width: 170px;
         padding: 10px;
        background-color:teal;
       cursor: pointer;
        border-radius: 30px;
    }

    .insertImage{
      background-color: black;
    }

    .resizingImage{
        position: fixed;
         width: 50%;
          height: 649px;
           top: -3px;
          left: -2px;
         background-repeat: no-repeat;
        object-fit: fill;
    }

    .resizingImage2{
        position: fixed;
         width: 52%;
          height: 650px;
            top: -3px;
           right: -2px;
          background-repeat: no-repeat;
         object-fit: fill;
        background-color: white;
    }
    
    .resizingImage3{
        position: absolute;
         overflow: hidden;
          width: 100px;
           height: 100px;    
     	  top:calc(-100px/2);
	     left:calc(50% - 50px);
        border-radius: 50px;
    }
    

</style>
</head>

<body>
    <div class="insertImage">
      <img class="resizingImage"  src="q2.png" alt="">
       <img class="resizingImage2"  src="background.jpg" alt="">
    </div>
      <center>
        <div class="loginForm">
        <form action="" method="POST" >
         <img class="resizingImage3"  src="user.png" alt="">
          <h2>Join Us!</h2>
            <p>E-mail</p>
             <input type="email" name="email" placeholder="****@gmail.com"></br>
              <p>Password</p>
             <input type="password" name="pass" placeholder="Enter Password (Minimun 5 characters)" minlength="5"></br></br>
            <button class="button" type="Login" name="Login" value="Login">Login</button>
           </form>
        </div>
     </center>
<a href="">
<div class="phpStyling">
<?php
  #error_reporting(0);
   session_start();
    if(isset($_POST['Login']))
    {  
          if(empty($_POST['email'])){
           echo"Email Missing!";
            }
            else if(empty($_POST['pass'])){
             echo"Password Missing!";
            }
     else
     {
      $db_sid = "(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) )(CONNECT_DATA = (SID = HusnainOracl)))";         ;            // Your oracle SID, can be found in tnsnames.ora  ((oraclebase)\app\Your_username\product\11.2.0\dbhome_1\NETWORK\ADMIN) 
		   $db_user = "scott";   
		    $db_pass = "password";    
		   $con = oci_connect($db_user,$db_pass,$db_sid); 
		    if($con) {} 
	       else 
		      {	die('Could not connect to Oracle: ');}
        
         $email=$_POST['email'];
          $pass=$_POST['pass'];
          $_SESSION["email"]=$email;

          $query="SELECT * from login where email='$email'";
          $parsedQuery=oci_parse($con,$query);
          $exceutionResult=oci_execute($parsedQuery);
        if($exceutionResult) 
        {
            $numofRows=oci_fetch_all($parsedQuery,$numofRows);
            if($numofRows==0)
             {
               $_SESSION["user"]="New User";
                $queryTwo="INSERT into login values('$email','$pass')";
                 $parsedQueryTwo=oci_parse($con,$queryTwo);
                  $exceutionResultTwo=oci_execute($parsedQueryTwo);
                   if($exceutionResultTwo){header("Location: homePage.php");}
                    else{echo "Unsuccessful Insertion!";}
                    oci_commit($con);
            }
           else if($numofRows>0)
            { 
               $query="SELECT * from login where email='$email' AND password='$pass'";
               $parsedQuery=oci_parse($con,$query);
               $exceutionResult=oci_execute($parsedQuery);
               $numofRows=oci_fetch_all($parsedQuery,$numofRows);
               if($numofRows>0)
                {
                  $_SESSION["user"]=" ";
                  header("Location: homePage.php");
                }
                else
                   echo"Incorrect Password!";
            }
        }
        else{
              echo "First Query Not executed!";
        }
    }
}
?>

</div>  
</body>
</html>