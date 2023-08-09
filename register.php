<?php

    $fname = "";
    $email = "";
    $Password = "";
    $ReEnter = "";
    if(isset($_POST['submit']))
    {
        
        $fname = $_POST['fname'];
        $email = $_POST['email'];
        $Password = $_POST['Password'];
        $ReEnter = $_POST['ReEnter'];
    }

    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "signupdb";

    $con = mysqli_connect($host, $username, $password, $dbname);

    if (!$con)
    {
        die("Connection failed!" . mysqli_connect_error());
    }

    $sql = "INSERT INTO signup ( fname, email, Password, ReEnter) VALUES ( '$fname', '$email', '$Password', '$ReEnter')";
    
    $rs = mysqli_query($con, $sql);
    if($rs)
    {
        echo "Signup Successfull :) ";
        echo " <br><a href='news.html'> Click to Home page</a> ";
    }
   
    mysqli_close($con);

?>