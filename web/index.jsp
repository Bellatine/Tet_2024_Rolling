
<!--    Created on : Jan 24, 2024, 1:45:44 PM
    Author     : namng-->


<%@taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./rolling.css">
    <title>Viettel Roller</title>
</head>

<body>
    <header>
            <image src="./img/logo_viettel.png" style="height: 2.5rem; padding-top: 5px; padding-left: 20px"/>
    </header>
    <div class="slots">
        <div class="reel_bg">
            <div class="reel"></div>
        </div>
        <div class="reel_bg">
            <div class="reel"></div>
        </div>
        <div class="reel_bg">
            <div class="reel"></div>
        </div>
        <div class="reel_bg">
            <div class="reel"></div>
        </div>
        <div class="reel_bg">
            <div class="reel"></div>
        </div>
        <div class="reel_bg">
            <div class="reel"></div>
        </div>
        
        
    </div>
    
    <button class="roll-button" onclick="rollAll()">Quay</button>
    
    <button class="roll-button" onclick="resetReels()">Reset</button>
    <script src="./rolling.js"></script>
    <!-- <img style="position:fixed; left: 0; top: 0; height: 100vh; width: auto;"  src="https://assets.codepen.io/439000/slotreel.webp"> -->


</body>

</html>