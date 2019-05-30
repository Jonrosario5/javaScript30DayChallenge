const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const togglePlay = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled')
const skipButtons = document.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider');


function playVideo(){
    if(video.paused){
        video.play();
    } else{
        video.pause();
    }   
}

function updateButton(){
    let icon;
    if(this.paused){
        icon = '►';
    } else {
        icon = '❚ ❚'
    }
    console.log(icon);
    togglePlay.textContent = icon;
}

function skip(){
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate(){
    video[this.name] = this.value;

}

function updateProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){

    const scrubTime = (e.offsetX/ progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
video.addEventListener('click',playVideo);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',updateProgress);

togglePlay.addEventListener('click',playVideo)

skipButtons.forEach(button => button.addEventListener('click',skip))
ranges.forEach(range => range.addEventListener('change',rangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove',rangeUpdate))

let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));
progress.addEventListener('mousedown',()=>{mousedown=true;});
progress.addEventListener('mouseup',()=>{mousedown=false;});