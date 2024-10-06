let Music = [
    ['Family Di Member - Amrinder Gill.mp3'],
    ['Lungi Dance.mp3'],
    ['new_320_97 De Yaar - Kulwinder Billa.mp3'],
]

let musicCount = 0;


const seekbar = document.querySelector('.seek-bar input');
const buttons = document.querySelectorAll('.buttons i');
const ham = document.querySelector('.ham i');
const list = document.querySelector('.main .list');
const closeList = document.querySelector('.cross i');
const main = document.querySelector('.main');
const musicName = document.querySelector('.currunt-music-name p');
const playPause = document.querySelector('.play i')
const crTime = document.querySelector('.crtime');
const time = document.querySelector('.time');


const audio = document.createElement('audio');
audio.src = `Music/${Music[musicCount]}`;

Music.forEach((e) => {
    const div = document.createElement('div')
    const p = document.createElement('p');
    p.innerText = e;
    div.append(p);
    div.classList.add('divv');
    list.append(div)

})

list.addEventListener('click', (e) => {
    if (e.target.tagName === "P" || e.target.className === 'divv') {
        audio.src = `Music/${e.target.innerText}`;
        musicName.innerText = e.target.innerText;
        audio.play()
    }
})

musicName.innerText = Music[musicCount]


main.addEventListener('click', (e) => {
    if (e.target.className === 'main' || e.target.className === 'logo' || e.target.className === 'outer-logo') {
        list.style.left = '-195px';
        ham.style.display = 'block';
    }
})

ham.addEventListener('click', () => {
    ham.style.display = 'none';
    list.style.left = '0px'
})

closeList.addEventListener('click', () => {
    list.style.left = '-195px';
    ham.style.display = 'block'
})

buttons.forEach((e) => {
    e.addEventListener('click', () => {

        if (e.className === 'fa-solid fa-play') {
            e.classList.remove('fa-play')
            e.classList.add('fa-pause')
            audio.play()

        } else if (e.className === 'fa-solid fa-pause') {
            e.classList.remove('fa-pause')
            e.classList.add('fa-play')

            audio.pause()
        }

        if (e.className === 'fa-solid fa-forward') {
            if (musicCount < Music.length - 1) {
                musicCount++;
                musicName.innerText = Music[musicCount]
                if (playPause.className === 'fa-solid fa-play') {
                    playPause.classList.remove('fa-play')
                    playPause.classList.add('fa-pause')
                }
            }
            audio.src = `Music/${Music[musicCount]}`
            audio.play()
        }
        if (e.className === 'fa-solid fa-backward') {
            if (musicCount < Music.length && musicCount > 0) {
                musicCount--;
                musicName.innerText = Music[musicCount]
            }

            audio.src = `Music/${Music[musicCount]}`
            audio.play()
            if (playPause.className === 'fa-solid fa-play') {
                playPause.classList.remove('fa-play')
                playPause.classList.add('fa-pause')
            }
        }
    })
})

seekbar.value = 0;
audio.addEventListener('loadedmetadata', () => {
    seekbar.max = audio.duration;
    time.innerText = (audio.duration / 60).toFixed(2);
})

audio.addEventListener('timeupdate', () => {
    seekbar.value = audio.currentTime;
    crTime.innerText = (audio.currentTime / 60).toFixed(2);
})

seekbar.addEventListener('input', () => {
    audio.currentTime = seekbar.value
});

seekbar.addEventListener('change', () => {
    if (playPause.className === 'fa-solid fa-play') {
        playPause.classList.remove('fa-play')
        playPause.classList.add('fa-pause')
    }
    audio.play()
})