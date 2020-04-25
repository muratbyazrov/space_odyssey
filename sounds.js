const cool = document.querySelector('.cool');
const angry = document.querySelector('.angry');
const spacex = document.querySelector('.spacex');

let coolAudio = new Audio();
let angryAudio = new Audio();
let spacexAudio = new Audio();


let blaster = new Audio('./sounds/blaster.mp3');
blaster.volume = 0.5;
let bomb = new Audio('./sounds/bomb.mp3');
let attention = new Audio('./sounds/attention.mp3');

//функция звука на событие
function sounds(event) {
    event.pause();
    event.currentTime = 0.0;
    event.play();
}

//функция для воспроизведения музыки
function music(moode, event) {
    if(event.target.classList.contains('play')){
        event.target.classList.remove('play');
        moode.pause();
    } else {
        coolAudio.pause();
        angryAudio.pause();
        spacexAudio.pause();
        document.querySelectorAll('.menu__image').forEach(function(item){
            item.classList.remove('play');
        })
        event.target.classList.toggle('play');
        moode.play();
    }
}

//функция подбора музыки
function play(event) {
    if(event.target.classList.contains('cool')){
        let rand = random(1, 3)
        coolAudio.src = `./sounds/music/cool${rand}.mp3`
        music(coolAudio, event);
    } else if(event.target.classList.contains('spacex')){
        let rand = random(1, 5)
        spacexAudio.src = `./sounds/music/spacex${rand}.mp3`
        music(spacexAudio, event);
    } else if(event.target.classList.contains('angry')){
        let rand = random(1, 4)
        angryAudio.src = `./sounds/music/angry${rand}.mp3`
        music(angryAudio, event);
    }
}


document.addEventListener('click', play);
