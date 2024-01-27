/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
//**************** NEW CODE ****************
let topPx = 0;// biến cộng thêm top cho bóng
let topDivContainEmployeeInfo = 45;
let employeeWinner;
let count = 0; // Biến đếm 
// LotteryMachine Class
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

fetchDataEmployee('http://localhost:8082/api/v1/lottery/list-winner-employee-data')
  .then(data => {
    employeeWinner = data;
  })
  .catch(error => {
    console.error('Lỗi:', error);
  });
//**************** NEW CODE ****************
class LotteryMachine {
  constructor(opt = {}) {
    let _def
    _def = {
      class: "lottery-machine",
      viewClasses: {
        base : 'base' ,
        lever: 'lever',
        tube: 'tube',
        rightDoor: 'right-door',
        leftDoor: 'left-door',
        lift: 'lift',
        ball: 'ball',
        hoverArea: 'hover-area'
      },
      size: 140,      
      ball: {
        count: 16,
        size: 36,
        colors: [
          "#c15bb6",
          "#8380c3",
          "#ffde7f",
          "#ff8f03",
          "#ec5767",
          "#ff8085"
        ]
      },
      duration: [200, 225]
    }
    // _ASSERT(opt.ball.count?, "opt.ball.count is required")
    this.opt = $.extend(true, _def, opt)
    this.view = null
    this.views = {}
    this.dom = { canvas: null }
    this.balls = []
    this.build()
  }

  build(opt = {}) {
    let base, ref
    base = this.dom
    this.opt = $.extend(this.opt, opt)

    if (this.view == null) {
      this.view = $("<div>", { class: `${this.opt.class}`});
    }

    for (let key in this.opt.viewClasses) {
      this.views[key] = $("<div>", { class: `lottery-${this.opt.viewClasses[key]}`});
      this.views[key].appendTo(this.view);  
    }
 
    if (base.canvas == null) {
      base.canvas = $("<canvas>", { class: `${this.opt.class}-canvas`}).appendTo(this.view)
    }

    // Добавить новые шарики
    this.balls = function() {
      let results = []
      for (
        let j = 0, ref = this.opt.ball.count;
        0 <= ref ? j < ref : j > ref;
        0 <= ref ? j++ : j--
      ) {
        results.push(j)
      }
      return results
    }
      .apply(this)
      .map(i => {
        return this.createBall()
      })
    this._setContext()
    return this
  }

  // Сформировать новый шарик
  createBall() {
    let _from, _ball
    _ball = {
      // Начальные параметры анимации
      from: {
        pos: (_from = this.getBallPos(false)),
        time: null
      },
      // Конечные параметры анимации
      to: {
        pos: this.getRandomPos()
      },
      pos: _from,
      // Длительность анимации
      duration: this.getRandomDuration(),
      rotate: 0
    }
    return _ball
  }

  // Запомнить контекст для молекул
  _setContext() {
    let _ratio, _size
    _ratio = this._getRatio()
    _size = this.opt.size
    this.dom.canvas
      .attr({
        width: _size * _ratio,
        height: _size * _ratio
      })
      .css({
        width: _size,
        height: _size
      })
    this.ctx = this.dom.canvas[0].getContext("2d")
    this.ctx.scale(_ratio, _ratio)
    this.ctx.save()
    return this
  }

  // Получить коэффициент масштабирование канваса
  _getRatio() {
    return (window.devicePixelRatio === 2 ? 2 : 1)
  }

  // Сгенерировать позицию шарики
  getRandomPos() {
    let _angle, _m_radius, _pos, _radius, _t_radius, x, y
    _angle = Math.random() * 2 * Math.PI
    _radius = this.opt.size / 2
    // Радиус шарики
    _m_radius = this.opt.ball.size / 2
    // Радиус окружности для расчета координат
    // Увеличен на 1/5 от радиуса шарики для устранения зазоров между молекулой и стенками пробирки
    _t_radius = _radius - _m_radius + 0.5 * _m_radius
    // Координаты на окружности
    y = Math.sin(_angle) * _t_radius
    x = Math.cos(_angle) * _t_radius
    _pos = {
      left: _radius + x,
      top: _radius - y
    }
    return _pos
  }

  // Сгенерировать позицию шарики
  getBallPos(random = true) {
    let _angle, _m_radius, _pos, _radius, _t_radius, x, y, randomShift
    randomShift = 0
    if (random) {
      _angle = Math.random() * 2 * Math.PI
    } else {
      _angle = 4 / 3 * Math.PI + Math.random() * Math.PI / 3
      randomShift = Math.random() * 10 - 5
    }
    _radius = this.opt.size / 2
    // Радиус шарики
    _m_radius = this.opt.ball.size / 2
    // Радиус окружности для расчета координат
    // Увеличен на 1/5 от радиуса шарика для устранения зазоров между молекулой и стенками пробирки
    _t_radius = _radius - _m_radius + 0.5 * _m_radius
    // Координаты на окружности
    y = Math.sin(_angle) * _t_radius + randomShift
    x = Math.cos(_angle) * _t_radius + randomShift
    _pos = {
      left: _radius + x,
      top: _radius - y
    }
    return _pos
  }

  // Сгенерировать позицию шарики
  getRandomDuration() {
    return Math.round(
      Math.random() * [this.opt.duration[1] - this.opt.duration[0]] +
        this.opt.duration[0]
    )
  }

  // Сгенерировать угол поворота
  getRandomAngle() {
    return Math.round(Math.random() * 4 * Math.PI - 2 * Math.PI)
  }


  // Нарисовать одну молекулу
  _drawBall(ball, index) {
    let _pos, _radius
    this.ctx.save()
    // Позиция центра шарики
    _pos = {
      left: parseInt(ball.pos.left, 10),
      top: parseInt(ball.pos.top, 10)
    }
    // Радиус шарики
    _radius = this.opt.ball.size / 2
    // Изменить начало координат
    this.ctx.translate(_pos.left, _pos.top)
    // Начальный угол поворота
    this.ctx.rotate(ball.rotate)
    this.ctx.moveTo(0, 0)
    // Внешние окружности
    this.ctx.beginPath()
    this.ctx.fillStyle = this.opt.ball.colors[Math.floor(Math.random() * 7)]    
    this.ctx.arc(0, 0, _radius / 2, 0, 2 * Math.PI)
    this.ctx.fill()
    // Внутренние окружности
    this.ctx.beginPath()
    this.ctx.fillStyle = "#ffffff"
    this.ctx.arc(_radius / 6, -_radius / 6, _radius / 8, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.restore()
    return this
  }

  // Нарисовать шарики
  drawBalls() {
    if (!this.disabled) {
      this._clearBalls()
      this.balls.map((ball, index) => {
        return this._drawBall(ball, index)
      })
    }
    return this
  }

  // Произвольная анимация
  animate(opt = {}, step, cb) {
    let _deferred, _t_func, _time_from, def
    // Значения по умолчанию
    def = {
      from: 0,
      to: 1,
      duration: 500,
      step: 30
    }
    opt = $.extend(true, def, opt)
    _deferred = $.Deferred()
    if (!this.disabled) {
      _time_from = Date.now()
      // Вспомогательная рекурсивная функция
      _t_func = function() {
        let _k, _val
        // Прогресс анимации
        _k = (Date.now() - _time_from) / opt.duration
        if (_k < 1) {
          _val = opt.from + _k * (opt.to - opt.from)
          step(_val)
          return setTimeout(_t_func, opt.step);          
          // $.delay(opt.step, _t_func)
        } else {
          step(opt.to)
          _deferred.resolve()
          return typeof cb === "function" ? cb() : void 0
        }
      }
      _t_func()
    } else {
      _deferred.resolve()
    }
    return _deferred
  }

  // анимация перемешивания шариков
  _shakeBalls(now) {
    this.views.lever.removeClass('hover').addClass('down');
    this.balls.forEach(ball => {
      //console.log(now);
      // Если цикл анимации завершился или не начинался
      var _k, i, len, ref, type

      if (ball.from.time == null || ball.from.time + ball.duration < now) {
        ball.from.time = now
        ball.from.pos = $.extend({}, ball.pos)
        ball.to.pos = this.getRandomPos()
        ball.to.rotate = this.getRandomAngle()
      } else {
        // Пересчитать координаты
        _k = (now - ball.from.time) / ball.duration
        ref = ["left", "top"]
        for (i = 0, len = ref.length; i < len; i++) {
          type = ref[i]
          ball.pos[type] =
            ball.from.pos[type] +
            _k * (ball.to.pos[type] - ball.from.pos[type])
          ball.rotate = _k * ball.to.rotate
        }
      }
    })
    this.drawBalls();
  }

  // анимация прекращения перемешивания шариков
  _endShakeBalls(now){
    this.views.lever.removeClass('down')
    this.balls.forEach(ball => {
          // Если цикл анимации завершился или не начинался
          var _k, i, len, ref, type
  
          if (ball.from.time == null || ball.from.time + ball.duration < now) {
            ball.from.time = now
            ball.from.pos = $.extend({}, ball.pos)
            ball.to.pos = this.getBallPos(false)
            ball.to.rotate = this.getRandomAngle()
          } else {
            // Пересчитать координаты
            _k = (now - ball.from.time) / ball.duration
            ref = ["left", "top"]
            for (i = 0, len = ref.length; i < len; i++) {
              type = ref[i]
              ball.pos[type] =
                ball.from.pos[type] +
                _k * (ball.to.pos[type] - ball.from.pos[type])
              ball.rotate = _k * ball.to.rotate
            }
          }
        })
    this.drawBalls();
  }

  // play: shakeBalls + endShakeBalls
  play(){
    let _now = Date.now();
    return this.animate({
      from: _now,
      to: _now + 2000,
      duration: 2000,
      step: 2
      }, (now) => this._shakeBalls(now)
    ).then(() => {
        _now = Date.now();
         this.animate({
          from: _now,
          to: _now + 500,
          duration: 500,
          step: 2
        }, (now) => this._endShakeBalls(now))
      });
  }

  // animation of rolling ball out of machine
  rollBallOut(parent, placeForBall, animationOpt, callback){  
    const { ball, lift, rightDoor, leftDoor } = this.views;  
    const randomColor = this.opt.ball.colors[Math.floor(Math.random() * this.opt.ball.colors.length)];
    const randomNumber = employeeWinner[count].employeeID;
    topPx += 80;
    const newDiv = document.createElement("div");
    
    // tạo div chứa thông tin nhân viên
    const newContent = document.createTextNode(`${employeeWinner[count].employeeID}   -   ${employeeWinner[count].name}   -   ${employeeWinner[count].email}`);
    newDiv.appendChild(newContent);
    newDiv.setAttribute("style", `background-color: #fff; border-radius: 5px; padding: 5px; color: #EA0029; top: 363px; left: 279px; font-weight: 600; font-size: 1.8rem; transform: matrix(1, 0, 0, 1, 300, ${-(356 - topPx)}); display: flex; z-index: 100; position: absolute; width: 300; height: 60 !important`);

    
        ball    
          .removeClass("no-transition")
          .attr('style', '')
          .html('')
          .css({ backgroundColor: randomColor })       
          .addClass("blink"); 

        function liftBallUp(){      
          return new Promise(resolve => { 
            ball.addClass('animation-up');
            lift.addClass("animation");        
            setTimeout(resolve, 1000);
          });
        }

        function liftBallDown(){
          return new Promise(resolve => {
            ball.addClass("animation-roll");
            lift.removeClass("animation");
            setTimeout(resolve, 1500);
          });
        }

        function openDoors(){
          return new Promise(resolve => {
            ball.css({ zIndex: 2 })
                .html(randomNumber)
                .addClass("no-transition")
                .removeClass("blink animation-roll animation-up"); 

            rightDoor.addClass("animation");
            leftDoor.addClass("animation");

            setTimeout(resolve, 1000);
          });
        }

        function moveBallOut(){     
          const startCoords = ball.offset();
          const endCoords = placeForBall.offset();

          const animatedBall = ball
            .clone()
            .addClass('clone')
            .css(startCoords)
            .appendTo(parent);
          

          return new Promise(resolve => {  
            TweenMax.to(animatedBall, 1, {
              ...animationOpt,         
    // mặc định x là 200 px ứng với chiều ngang
              x: 200,
              y: -(startCoords.top - topPx),    
              ease: Power2.easeInOut,
              parseTransform: true,  
              onStart: () => {
                ball.css({opacity: 0});
                animatedBall.css({zIndex: 100});
              },    
              onComplete: () => {
                rightDoor.removeClass("animation");
                leftDoor.removeClass("animation");  
                // insert thông tin nhân viên trúng giải
                document.getElementById("scene").insertAdjacentElement("afterbegin", newDiv);
                resolve();
              }         
            });      
          });    
        }

        liftBallUp()
          .then(() => liftBallDown())
          .then(() => openDoors())
          .then(() => moveBallOut())
          .then(() => setTimeout(callback, 1000));
  } 

  // Добавить экзмепляр в DOM-дерево
  draw(parent) {
    this.view.appendTo(parent);
    this.ctx.save()
    this.ctx.translate(0, 0)
    this.ctx.beginPath()
    this.ctx.fillStyle = "#ff0000"
    this.ctx.arc(70, 70, 70, 0, 2 * Math.PI)
    this.ctx.fill()
    this.drawBalls()
    return this
  }

  // Очисить канвас
  _clearBalls() {
    this.ctx.clearRect(0, 0, this.opt.size, this.opt.size)
    return this
  }

  clear() {
    this.view.remove()
    this.dom.canvas = null
    this.balls = []
    return this
  }
}

// main variables 
const $scene = $('.scene');
const $ballPlace = $('#ball-place');
const $button = $('button#play');
// kích thước quả bóng
const ballAnimationOpt = {
  width: 60,
  height: 60,
  fontSize: 18
};

// init LotteryMachine
const lotteryMachine = new LotteryMachine();
lotteryMachine.draw($scene);



const handleClick = () => {
  $button.off('click');

  lotteryMachine
    .play()
    .then(() => {
      lotteryMachine.rollBallOut($scene, $ballPlace, ballAnimationOpt, () => {
        count++; // Tăng biến đếm lên 1 sau khi chạy hàm
        if (count < 10) {
          handleClick(); // Gọi lại hàm handleClick để chạy lần tiếp theo
        } else {
          $button.on('click', handleClick); // Gán lại sự kiện click cho nút sau khi hoàn thành 10 lần
        }
      });
    })
    .catch((error) => {
      console.error(error); // Xử lý lỗi nếu có
      $button.on('click', handleClick); // Gán lại sự kiện click cho nút trong trường hợp xảy ra lỗi
    });
};

$button.on('click', handleClick);

