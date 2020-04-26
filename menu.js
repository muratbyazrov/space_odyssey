//функция, которая считает количесво уничтоженных противников
let dCount = 0;
function destrCount() {
    dCount = dCount + 1;
    destroyed.textContent = dCount;
}

//функция, которая считает количесво уничтоженных противников
let mCount = 0;
function missCount() {
    mCount = mCount + 1;
    missing.textContent = mCount;
}

//функция, которая считает количесво уничтоженных противников
let hCount = 10;
health.textContent = hCount;
function healthCount() {
    if (hCount > 0) {
        hCount = hCount - 1;
        health.textContent = hCount;
    }
}
