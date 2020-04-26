const gameField = document.querySelector('.main-window');
const userBox = document.querySelector('.user-box');
const counter = document.querySelector('.counter');

const w = gameField.offsetWidth;
const h = gameField.offsetHeight;

/* ДЛЯ МЕНЮ */
const gameMenu = document.querySelector('.game-menu');
//чтобы скрыть
const menuMode = document.querySelector('.menu__block_mode');
const destroyed = document.querySelector('.destroyed');
const missing = document.querySelector('.missing');
const health = document.querySelector('.health');
const infoWin = document.querySelector('.info-window');
const START = document.querySelector('.info-window__start');

//создадим генератор случайных чисел
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//функция добавдения чего либо на игровое поле
function append(object) {
    gameField.appendChild(object);
}

//функция, задания движения по вертикали
function move(object, speed, step, timeOut) {
    let top = object.offsetTop;
    let goBox = setInterval(() => {
        top = top + step;
        object.style.top = `${top}px`
    }, speed);

    setTimeout(() => {
        clearInterval(goBox);
    }, timeOut*1000);
}

//функция, задания движения по горизонтали
function moveHor(object, speed, step, timeOut) {
    let left = object.offsetLeft;
    let goBox = setInterval(() => {
        left = left + step;
        object.style.left = `${left}px`
    }, speed);

    setTimeout(() => {
        clearInterval(goBox);
    }, timeOut*1000);
}


//функция удаления элементов, которые дошли до конца поля
function removeObject(element) {
    if (element.offsetTop >= gameField.offsetHeight || element.offsetTop < -400 ||
        element.offsetLeft >= gameField.offsetWidth || element.offsetLeft <0) {
        element.remove();
    }
}
//функция, которая запускает removeObject постоянно
function removeObjectInt() {
    const allElement = document.querySelectorAll('.control-element');
    allElement.forEach(function(item){
        removeObject(item);
    })
}
setInterval(() => {
    removeObjectInt();
}, 1);



//функция, которая увеличивает/уменьшает размер для 3Д симуляции
function acsom(object, speed, step) {
    let width = object.offsetWidth;
    let height = object.offsetHeight;
    let acsomer = setInterval(() => {
        width = width + step;
        height = height + step;
        object.style.width = `${width}px`;
        object.style.height = `${height}px`;
    }, speed);
    setTimeout(() => {
        clearInterval(acsomer);
    }, 20000);
    //randomSpaceObject(object);
}

//остановка любого интервала
function stopInt(intervalName) {
    clearInterval(intervalName);
    //console.log('Я остановил интервал')
}
//функция, котороая останавливает интерапл через заданнове время
function stopTime(intervalName, sec) {
    setTimeout(() => {
        stopInt(intervalName)
    }, sec*1000);
}


//Манупулятор юзерской коробкой
let left = userBox.offsetLeft;
function controller(keyCode, steping) {
    if ((keyCode == 37||keyCode == 65) && left >= 0) {
        left = left - steping;
        userBox.style.left = `${left}px`;
        //userBox.classList.add('user-box-left');
    } else if ((keyCode == 39|| keyCode == 68) && left < gameField.offsetWidth - userBox.offsetWidth) {
        left = left + steping;
        userBox.style.left = `${left}px`;
        //userBox.classList.add('user-box-right');
    }
}

//функция плавного движения
function smoothly() {
    let keyCode = event.keyCode;
    let interval
    if (!event.repeat) {
        interval = setInterval(() => {
            //вычислим шаг передвижение пользователя относитеьгно ширинв экрана
            controller(keyCode, w/800);
        }, 1);
    }
    if(event.repeat){
        interval = setInterval(() => {
            controller(keyCode, 0.4);
        }, 1);
    }
    setTimeout(() => {
        clearInterval(interval)
        userBox.classList.remove('user-box-left');
        userBox.classList.remove('user-box-right')
    }, 350);
}


//функция, которая уничтожает пользователя после н-ого количества поподаний
let bombArr = [];
function killUser(bullet) {
    sounds(attention);
    bullet.style.backgroundColor = 'yellow';
    bombArr.length = bombArr.length + 1;
    if (bombArr.length == 10) {
        gameMenu.classList.add('game-menu_end');
        stopInt(enemyMainInt);
        stopInt(spaceObjMainInt);
        gameField.classList.remove('game-start');
        menuMode.classList.add('display-none')
    }
}

//функция старт
let enemyMainInt;
let spaceObjMainInt;
function start(event) {
    if(event.keyCode == 13 && !START.classList.contains('yesStart')){
        //это нужно, чтобы запустить таймеры только один раз
        START.classList.add('yesStart');
        //скроем начаьную страницу
        infoWin.classList.add('info-window_none');
        //вернем музыку в боковое меню
        gameMenu.appendChild(menuMode);
        //уберём прозрачность у игрового поля и меню
        gameField.classList.add('game-start');
        gameMenu.classList.add('game-start');
        //gameMenu.classList.add('game-menu_end');
        //запускаем врагов и скороссть
        enemyMainInt = setInterval(intCreateEnemy, 1000);
        spaceObjMainInt = setInterval(randomObj, 15000);
    }
}

//добавим музыку на старотовое окно
function addMusicOnStartWindow() {
    infoWin.appendChild(menuMode)
}
addMusicOnStartWindow();

//Обработчик нажатия на клавиши
document.addEventListener('keydown', smoothly);

document.addEventListener('keydown', start);






