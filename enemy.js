//создание противника. Только функция
function createEnemy(left) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.classList.add('control-element');
    enemy.style.left = `${left}px`;
    return enemy
}

//функция, которая красиво убирает противника влево или вправо
function enemyAppears(object) {
    const rand = random(1, 2);
    if (rand == 1) {
        //объект, интервал, шаг таймаут
        moveHor(object, 1, 10, 15);
    } else {
        //объект, интервал, шаг таймаут
        moveHor(object, 1, -10, 15);
    }
    if(!object.classList.contains('bumb')){
    missCount();
    }
}

//функция, которая периодически создает противников
function intCreateEnemy() {
    //создали рандомную координату
    let randomLeft = random(100, w*0.8);
    let enemy = createEnemy(randomLeft);
    //добавили потивника и дали ему движение
    append(enemy);
    move(enemy, 15, 1, 15);
    acsom(enemy, 35, 1);
    //через две секунды противник стреляет
    setTimeout(() => {
        enemyFire(enemy);
    }, 1800);
    enemyMiss(enemy);
}

//функция, отводящая противника в сторону
function enemyMiss(enemy) {
    setTimeout(() => {
        enemyAppears(enemy);
    }, 2800);
}



