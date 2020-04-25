//рандомный выбор косимчесокго объекта
function randomSpaceObject(object) {
    let rand = random(1, 9)
    switch (rand) {
        case 1:
            object.classList.add('space-obj_one');
            break;
        case 2:
            object.classList.add('space-obj_two');
            break;
        case 3:
            object.classList.add('space-obj_three');
            break;
        case 4:
            object.classList.add('space-obj_four');
            break;
        case 5:
            object.classList.add('space-obj_five');
            break;
        case 6:
            object.classList.add('space-obj_six');
            break;
        case 7:
            object.classList.add('space-obj_seven');
            break;
        case 8:
            object.classList.add('space-obj_eight');
            break;
        case 9:
            object.classList.add('space-obj_nine');
    }
}


//Функция создания космич объекта
function createSpaceObject(randomLeft) {
    const spaceObj = document.createElement('div');
    spaceObj.classList.add('space-obj');
    spaceObj.classList.add('control-element');
    randomSpaceObject(spaceObj);
    spaceObj.style.left = `${randomLeft}px`
    spaceObjParam(spaceObj);
    append(spaceObj);
}

//зададим параметры движения космических объектов
function spaceObjParam(object) {
    move(object, 5, 0.1, 35);
    acsom(object, 10, 4);
}

//Функция, которая запускает создание космич объектов
function randomObj() {
    const randomLeft = random(0, gameField.offsetWidth);
    createSpaceObject(randomLeft);
}
//здесь можно настроить, как часто будут появляться космич объекты
//let spaceObjMainInt = setInterval(randomObj, 15000);
