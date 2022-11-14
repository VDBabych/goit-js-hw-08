// Імпортую Вімео та Лодеш
import throttle from "lodash.throttle";
import Player from '@vimeo/player';
//ключ до локал сторедж
const TIME_KEY = 'currentTime'
//отримую iframe
const iframeEl = document.querySelector("iframe");
//створюю екземпляр 
const myPlayer = new Player(iframeEl);
const throttledOnTimeUpdating = throttle(onTimeUpdating, 1000, { 'trailing': false });


myPlayer.on('timeupdate', throttledOnTimeUpdating);

myPlayer.on('ended', onVideoEnd);


function onTimeUpdating(e) {
    localStorage.setItem(TIME_KEY, e.seconds)
}

function onVideoEnd(e) {
    myPlayer.off('timeupdate', throttledOnTimeUpdating);
    localStorage.removeItem(TIME_KEY)
}



//Ініціалізація початкового значення прокрутки відео
(() => {
    const savedTime = localStorage.getItem(TIME_KEY) ?? 0;
        myPlayer.setCurrentTime(Number(savedTime)).then(function () {})
        .catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            console.log('the time was less than 0 or greater than the video’s duration');
            break;

        default:
            console.log('some other error occurred');
            break;
    }});
    
})();