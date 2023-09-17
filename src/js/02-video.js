import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

//aktualny czas odtwarzania//
const onPlay = function (data) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds))
};
// player.on('timeupdate', onPlay);

//wznawianie odtwarzania od zapisango momentu//
const currentTime = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(currentTime).then(function(seconds) {
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

//czas odtwarzania aktualizuje się w storage nie częściej niż raz na sekundę//
const throttleOnPlay = throttle(onPlay, 1000);

player.on('timeupdate', throttleOnPlay);