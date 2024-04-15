//query selector returns the first element that matches a css selector 
//select DOM NODELIST 
const wrapper = document.querySelector(".wrapper"),
     musicImg =   wrapper.querySelector("img"),
     musicName = wrapper.querySelector(".name"),
     musicArtist =wrapper.querySelector(".artist"),
     PlayPauseBtn =wrapper.querySelector(".play-pause"),
     prevBtn =wrapper.querySelector("#pre"),
     nextBtn = wrapper.querySelector("#next"),
     mainAudio =wrapper.querySelector("#main-audio"),
     progressArea =wrapper.querySelector(".progess-area");
    // progressBar = progressArea.querySelector("#progress-bar");

    
     //use of math.floor method 
     //calculating  a random music index using math.floor and math.random() to select a random index from music library
     //used  to load musicwhen page loads 
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
//boolean 
isMusicPaused = true;

//add event listener
//attaches am event handler to a specified element 
//calling music index
window.addEventListener("load" , () =>{
     loadMusic(musicIndex);
});


/*the function takes an indexNumb argument and updates the innertext 
and src properties of various elements to display
the music details(name,artist,image and audio source) 
*/
function loadMusic(indexNumb){
     musicName.innerText = allMusic[indexNumb - 1].name;
     musicArtist.innerText = allMusic[indexNumb - 1].artist;
     musicImg.src = `Assets/Images${allMusic[indexNumb - 1].src}.jpg`;
     mainAudio.src = `Assets/Images${allMusic[indexNumb - 1].src}.jpg`;
}
console.log(loadMusic);
/*they are used to play and pause the audio respectively*/
/*They also update the UI*/
function playMusic() {
     wrapper.classList.add("paused");
     musicImg.classList.add('rotate');
     PlayPauseBtn.innerHTML = `<i class="fa-solid fa-play"`;
     mainAudio.play();
}
console.log(playMusic);
function pauseMusic() {
     wrapper.classList.remove("paused");
     musicImg.classList.remove('rotate');
     PlayPauseBtn.innerHTML = `<i class="fa-solid fa-play"`;
     mainAudio.pause();
}

console.log(pauseMusic);

function prevMusic()
{
     musicIndex--;
     musicIndex < 1 ? musicIndex = allMusic.length : MusicIndex = musicIndex;
     loadMusic(musicIndex);
     playMusic();
}
console.log(prevMusic);
function nextMusic()
{
     musicIndex++;
     musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
     loadMusic(musicIndex);
     playMusic();
}
console.log(nextMusic);

//Event listener allow us to listen to events that are taking place in a webpage.
//methods of creating event listeners;use of global onevent attributes.

playPauseBtn.addEventListener("click", () => {
     const isMusicplay = wrapper.classList.contains("paused");
     isMusicplay ? pauseMusic() : playMusic();
});

prevBtn.addEventListener("click", () => {
     prevMusic();
});

nextBtn.addEventListener("click", () => {
     nextMusic();
});

//updates the progress bar and current time display as the audio playback progresses
mainAudio.addEventListener("timeupdate" ,(e) =>{
     const currentTime = e.target.currentTime;
     const duration = e.target.duration;
     let  progresswidth = (currentTime /duration) * 100;
     progressBar.style.width = `${progresswidth}%`;

     
     let musicCurrentTime = wrapper.querySelector(".current-time"),
     musicDuration = wrapper.querySelector(".max-duration");
     mainAudio.addEventListener("loadeddate" , () => {
          let mainAdDuration = mainAudio.duration;
          let totalMin = Math.floor(mainAdDuration / 60);
          let totalSec = Math.floor(mainAdDuration % 60);
          if(totalSec < 10)
          {
               totalSec = `0${totalSec}`;
               musicDuration.innerText = `${totalMin}:${totalSec}`;
          }
     });

      let currentMin = Math.floor(currentTime / 60);
      let currentSec = Math.floor(currentTime % 60);
      if(currentSec < 10)
      {
          currentSec  = `0${currentSec}`;
      }
      musicCurrentTime.innerText = `${currentMin}:${currentSec}`;                                        
});
progressArea.addEventListener("click" , (e) =>{
     let progressWidth = progressArea.clientWidth;
     let clickOffset = e.offsetX;
     let songDuration = mainAudio.duration;

     mainAudio.currentTime = (clickedOffsetX/ progressWidth)
});

mainAudio.addEventListener('ended' , () =>{
     nextMusic();
});
