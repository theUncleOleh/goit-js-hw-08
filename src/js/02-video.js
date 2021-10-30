import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const VIDEOPLAYER_CURRENT_TIME = "videoplayer-current-time";
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(function(data) {
    {
        duration: 61.857
        percent: 0.049
        seconds: 3.034
    }
    localStorage.setItem(VIDEOPLAYER_CURRENT_TIME, JSON.stringify(data));

}, 1000));

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

const saveCurrentTime = localStorage.getItem(VIDEOPLAYER_CURRENT_TIME);

const parseCurrentTime = JSON.parse(saveCurrentTime);

player.setCurrentTime(parseCurrentTime.seconds).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});



