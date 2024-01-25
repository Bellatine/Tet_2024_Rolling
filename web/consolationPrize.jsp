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
        <div class="prize-select win1">
            <label for="prize" style="font-size: 25px; color: #FF0000;">Chọn giải thưởng:</label>
            <select id="prize" name="prize">
                <option value="giai1" style="font-size: 20px; color: #FF0000; background-color: inherit;">Giải Nhất</option>
                <option value="giai2" style="font-size: 20px; color: #FF0000; background-color: inherit;">Giải Nhì</option>
                <option value="giai3" style="font-size: 20px; color: #FF0000; background-color: inherit;">Giải Ba</option>
                <!-- Thêm các option khác nếu cần -->
            </select>
        </div>
        <div class="scene">
            <div id="ball-place"></div> 
            <button id="play">Quay</button>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
        <script src="./consolationPrize.js"></script>
    </body>
</html>
