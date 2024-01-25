/* ... */

const debugEl = document.getElementById('debug'),
    icon_width = 79,
    icon_height = 79,
    num_icons = 10,
    time_per_icon = 100,
    indexes = [0, 0, 0];

async function fetchDataEmployee(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Lấy dữ liệu không thành công');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Đã xảy ra lỗi:', error);
    throw error;
  }
}

let employeeWinner;
//fetchDataEmployee('http://localhost:8082/api/v1/lottery/all-employee-data')
//  .then(data => {
//    employeeWinner = data;
//  })
//  .catch(error => {
//    console.error('Lỗi:', error);
//  });

const roll = (reel, offset = 0, fixedDelta) => {
    const delta = (offset + 2) * num_icons + num_icons - fixedDelta + 1;

    return new Promise((resolve, reject) => {

        const style = getComputedStyle(reel),
            backgroundPositionY = parseFloat(style["background-position-y"]),
            targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
            normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);

        setTimeout(() => {
            reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
            reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
        }, offset * 150);

        setTimeout(() => {
            reel.style.transition = `none`;
            reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
            resolve(delta % num_icons);
        }, (8 + 1 * delta) * time_per_icon + offset * 150);

    });
};

function rollAll() {
    resetReels();
    
    // Gọi lại hàm fetchDataEmployee để lấy dữ liệu mới từ API
    fetchDataEmployee('http://localhost:8082/api/v1/lottery/all-employee-data')
        .then(data => {
            // Lưu dữ liệu mới vào employeeWinner
            employeeWinner = data;

            const fixedDeltas = Array.from(employeeWinner.employeeID); 
            const prizeSelect = document.getElementById('prize');
            const selectedOption = prizeSelect.options[prizeSelect.selectedIndex];
            const selectedValue = selectedOption.value;
            const selectedText = selectedOption.text;

            employeeWinner.prize = selectedText;

            const reelsList = document.querySelectorAll('.slots > .reel_bg > .reel');

            Promise
                .all([...reelsList].map((reel, i) => roll(reel, i, fixedDeltas[i])))
                .then((deltas) => {
                    deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta) % num_icons);
                    
                    document.querySelector(".slots").classList.add("win1");
                    setTimeout(() => {
                        document.querySelector(".slots").classList.remove("win1");
                        showResultDialog(employeeWinner);
                        // Hiển thị dialog SweetAlert2 sau khi cuộc quay kết thúc
                        
                    }, 2000);
                });
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu:', error);
        });
}


function resetReels() {
    const reelsList = document.querySelectorAll('.slots > .reel_bg > .reel');

    reelsList.forEach((reel) => {
        reel.style.transition = 'none';
        reel.style.backgroundPositionY = '0';
    });
}

function showResultDialog(employeeWinner) {
    Swal.fire({
        title: 'Chúc mừng!',
        html: `
            Bạn đã trúng ${employeeWinner.prize}:<br>
            <strong>${employeeWinner.name}</strong><br>
            ID: ${employeeWinner.employeeID}<br>
            Email: ${employeeWinner.email}
        `,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Chấp nhận',
        cancelButtonText: 'Hủy',
        customClass: {
            background: 'custom-swal-background'
        },
        
    }).then((result) => {
        if (result.isConfirmed) {
            // Xử lý khi người dùng chấp nhận
            // Gửi employeeWinner cho API
            saveResultToApi(employeeWinner);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Xử lý khi người dùng hủy bỏ
            window.location.href = 'index.jsp'; // Chuyển hướng về trang index.jsp
        }
    });
}


function saveResultToApi(employeeWinner) {
    // Sử dụng fetch để gửi dữ liệu đến API
    fetch('http://localhost:8082/api/v1/lottery/save-result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeWinner)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Gửi dữ liệu không thành công');
        }
        return response.json();
    })
    .then(data => {
        // Xử lý khi gửi dữ liệu thành công (nếu cần)
        console.log('Dữ liệu đã được gửi thành công:', data);
    })
    .catch(error => {
        console.error('Lỗi khi gửi dữ liệu:', error);
    });
}



//setTimeout(rollAll, 1000);
