<html>
<head>
     <meta charset="UTD-8";
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home Page</title>
         <link rel="icon" href="q2.png" type="image/x-icon">
      <style>
          .body{
              color: white;
          }
       .navigationBar{
        background: rgba(0,0,0,0.2);
           color: white;
           padding: 20px ;
           margin-top: 100px;
           width: 100%;
       }
       .navigationBar a{
           padding: 14px 70px;
           color: salmon;
           font-size: 18px;
           display: inline;
           text-align: center;
       }
       .navigationBar a:hover{
           color: teal;
       }
       .navigationBar a.active{
           color: teal;
       }
       .resizingImage3{
        position: absolute;
         overflow: hidden;
          width: 100px;
           height: 100px;    
     	  top:calc(-170px/2);
	     left:calc(50% - 50px);
        border-radius: 50px;
    }
    .php{
        position:fixed;
          overflow: hidden;
          text-align: center;
           width: 245px;
            height: 4x;    
     	  top:220px;
	     left:calc(37% - 37px);
          font-size: 18px;
        color: salmon;    
        background: rgba(0,0,0,0.4);
         border: 1px solid red; 
    }
      </style>
</head>
<body style="background-image: url(homePage.jpg); position :fixed; top:30%;">
        <div class="navigationBar">
         <img class="resizingImage3"  src="user.png" alt="">
          <a href="report11.php" >Report 11</a>
           <a href="report12.php">Report 12</a>
           <a href="report13.php">Report 13</a>
          <a href="report14.php">Report 14</a>
         <a href="report15.php">Report 15</a>
        </div>
</body>
</html>
<div class="php">
<?php
   session_start();
   echo "Welcome! ".$_SESSION["email"].$_SESSION["user"];
?>