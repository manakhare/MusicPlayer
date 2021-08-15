const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: '7-nation Army',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row',
        artist: 'Jacinto Design',
    },   
];

//play and pause
let isPlaying = false;

function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//update dom

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex >= songs.length){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//update progress bar
function updateProgressBar(e){
    const { duration, currentTime} = e.srcElement;

    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`;

    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if(durationSec < 10){
        durationSec = `0${durationSec}`;
    }

    //to avaoid nan-delay
    if(durationSec){
        durationEl.textContent = `${durationMin}:${durationSec}`;
    }
    
    //current time
    const currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
    if(currentSec){
        currentTimeEl.textContent = `${currentMin}:${currentSec}`;
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

//event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);