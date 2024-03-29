<%-- 
    Document   : consolationPrize
    Created on : Jan 25, 2024, 8:54:14 PM
    Author     : Admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="./consolationPrize.css" />
        <title>Viettel Roller</title>
    </head>
    <body>
        <header>
                <image src="./img/logo_viettel.png" style="height: 2.5rem; padding-top: 5px; padding-left: 20px"/>
        </header>
        <div class="prize-select">
            <label for="prize">Chọn số lượng giải:</label>
            <select id="employeeCountSelect">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        
        <div class="scene" id="scene">
            <div id="ball-place"></div> 
            <button id="play">Quay</button>
            <button id="reset" onclick="resetRoll()">Đặt lại</button>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
        <script src="./consolationPrize.js"></script>
    </body>
</html>
