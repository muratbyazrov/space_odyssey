//созадет пули
function createBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.classList.add('control-element');
    return bullet;
}

//определитель начальной точки пули
function initCoord(user, bullet) {
    let bulletXCoord = `${user.offsetLeft + user.offsetWidth / 2}px`;
    let bulletYCoord = `${user.offsetTop}px`;
    bullet.style.left = bulletXCoord;
    bullet.style.top = bulletYCoord;
}


//функция огонь
function fire() {
    if (!event.repeat && (event.keyCode == 32 || event.keyCode == 13)) {
        sounds(blaster);
        let bullet = createBullet();
        initCoord(userBox, bullet);
        append(bullet);
        //1 - сокрость повторов, 2 шаг, 3 - таймаут в сек
        move(bullet, 1, -6, 2);
        //здесь мы вычисляем время относительно высоты игрового поля
        acsom(bullet, h / 15, -2);
        //удалим тот объект, который дошёл до границы экрана
        removeObject(bullet);
        //уничтожение
        killerInt(bullet);
    }
}



//Таймеры для функции проверки на попадание во врага
function killerInt(bullet) {
    let interval = setInterval(() => {
        killer(bullet, interval)
    }, 1);
    //В любом случае останавливаем таймер.
    stopTime(interval, 3);
}

//Проверка на поподание и запуск уничтожение.
function killer(bullet, interval) {
    const enemys = document.querySelectorAll('.enemy');
    enemys.forEach(function (enemy) {
        if (bullet.offsetTop <= enemy.offsetTop - enemy.offsetHeight &&
            bullet.offsetLeft >= enemy.offsetLeft && bullet.offsetLeft < enemy.offsetLeft + enemy.offsetWidth) {
            //запускаем функцию ниже
            enemyRemove(enemy, bullet);
            //Удаляем интервал проверки на попадание
            stopInt(interval);
        }
    })
}

//Уничтожение противника
function enemyRemove(enemy, bullet) {
    sounds(bomb);
    //счёт
    if (!enemy.classList.contains('bumb')) {
        destrCount();
    }
    //стиль
    enemy.classList.add('bumb');
    bullet.remove();
    setTimeout(() => {
        enemy.remove();
    }, 500);
}



//функкция стрельбы противника
function enemyFire(user) {
    //Если противник не взорван
    if (!user.classList.contains('bumb')) {
        //созадим пулю с нужными координатами, добавим её.
        let bullet = createBullet();
        bullet.classList.add('enemy-bullet');
        initCoord(user, bullet);
        append(bullet);
        //1 - сокрость повторов, 2 шаг, 3 - таймаут в сек
        move(bullet, 1, 3, 2);
        acsom(bullet, 55, 1);
        removeObject(bullet);
        userLooseInt(bullet);
    }
}

//интервал функции userLoose
function userLooseInt(bullet) {
    let interval = setInterval(() => {
        userLoose(bullet, interval)
    }, 1);
    setTimeout(() => {
        stopInt(interval);
    }, 1000);
}
//функция, которая проверяет, попала ли пуля в пользователя
function userLoose(bullet, interval) {
    let uTop = userBox.offsetTop;
    let uLeft = userBox.offsetLeft;
    let uWidth = userBox.offsetWidth;
    let bTop = bullet.offsetTop;
    let bLeft = bullet.offsetLeft;
    if (bTop >= uTop && bLeft >= uLeft && bLeft <= uLeft + uWidth) {
        stopInt(interval);
        killUser(bullet);
        healthCount();
    }
}

document.addEventListener('keydown', fire)