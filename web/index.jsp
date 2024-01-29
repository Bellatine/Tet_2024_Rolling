
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
    <!-- Thư viện SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <link rel="stylesheet" href="./rolling.css">
    <title>Viettel Roller</title>
</head>

<body>
    <header>
            <image src="./img/logo_viettel.png" style="height: 2.5rem; padding-top: 5px; padding-left: 20px"/>
    </header>
    <div class="prize-select win1">
        <label for="prize" style="font-size: 25px; color: #FF0000;">Chọn giải thưởng:</label>
        <select id="prize" name="prize" onchange="redirectToPage()">
            <option value="giai1" style="font-size: 20px; color: #FF0000; background-color: inherit;">Giải Nhất</option>
            <option value="giai2" style="font-size: 20px; color: #FF0000; background-color: inherit;">Giải Nhì</option>
            <option value="giai3" style="font-size: 20px; color: #FF0000; background-color: inherit;">Giải Ba</option>
            <option value="giaiKK" style="font-size: 20px; color: #FF0000; background-color: inherit;">Giải KK</option>
            <!-- Thêm các option khác nếu cần -->
        </select>

        <script>
            function redirectToPage() {
                var selectedValue = document.getElementById("prize").value;

                if (selectedValue === "giaiKK") {
                    window.location.href = "./consolationPrize.jsp";
                }
            }
        </script>
    </div>
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
    
    <div class="button-wrapper">
        <button class="roll-button" onclick="rollAll()">Quay</button>
    
        <button class="roll-button" onclick="resetReels()">Đặt lại</button>
    </div>

    <script src="./rolling.js"></script>
    <!-- <img style="position:fixed; left: 0; top: 0; height: 100vh; width: auto;"  src="https://assets.codepen.io/439000/slotreel.webp"> -->


</body>

</html>