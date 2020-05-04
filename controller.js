//Манупулятор кораблем клавиатурой
let left = userBox.offsetLeft;
function controller(keyCode, steping, event) {
    if (keyCode == 37||keyCode == 65||event.target.classList.contains('control__button_left')) {
        leftGo(steping);
    } else if (keyCode == 39||keyCode == 68||event.target.classList.contains('control__button_right')) {
        rightGo(steping);
    }
}

//функции смещения влево/вправо коробля пользователя
function leftGo(steping) {
    if(left >= 0){
    left = left - steping;
    userBox.style.left = `${left}px`;
    }
}
function rightGo(steping) {
    if(left < gameField.offsetWidth - userBox.offsetWidth){
    left = left + steping;
    userBox.style.left = `${left}px`;
    }
}

//функция плавного движения
function smoothly(event) {
    let keyCode = event.keyCode;
    let interval
    if (!event.repeat) {
        interval = setInterval(() => {
            //вычислим шаг передвижение пользователя относитеьгно ширинв экрана
            controller(keyCode, w/700, event);
        }, 1);
    }
    if(event.repeat){
        interval = setInterval(() => {
            controller(keyCode, 0.4);
        }, 1);
    }
    setTimeout(() => {
        clearInterval(interval)
    }, 350);
}

//Обработчик нажатия на клавиши
document.addEventListener('keydown', smoothly);
document.addEventListener('click', smoothly)