document.addEventListener("DOMContentLoaded", () => {
    // const audio = document.querySelector("audio");
    // audio.volume = 0.2;
    // audio.play();    
});

new Plyr('#player');
function loadPlayer() {
    const video = document.querySelector("video");
    const source = video.getElementsByTagName("source")[0].src;
    
    // For more options see: https://github.com/sampotts/plyr/#options
    // captions.update is required for captions to work with hls.js
    const defaultOptions = {};
  
    if (Hls.isSupported()) {
      // For more Hls.js options, see https://github.com/dailymotion/hls.js
      const hls = new Hls();
      hls.loadSource(source);
  
      // From the m3u8 playlist, hls parses the manifest and returns
      // all available video qualities. This is important, in this approach,
      // we will have one source on the Plyr player.
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
  
        // Transform available levels into an array of integers (height values).
        const availableQualities = hls.levels.map((l) => l.height)
  
        // Add new qualities to option
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          // this ensures Plyr to use Hls to update quality level
          forced: true,        
          onChange: (e) => updateQuality(e),
        }
  
        // Initialize here
        const player = new Plyr(video, defaultOptions);
      });
      hls.attachMedia(video);
      window.hls = hls;
    } else {
      // default options with no quality update in case Hls is not supported
      const player = new Plyr(video, defaultOptions);
    }
  
    function updateQuality(newQuality) {
      window.hls.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          console.log("Found quality match with " + newQuality);
          window.hls.currentLevel = levelIndex;
        }
      });
    }
}

let speaker = document.querySelector(".speaker");
let audioPlayer = document.querySelector("audio");
let playerWrapper = document.getElementsByClassName("player-wrapper")[0];
let watchButton = document.getElementsByClassName("watch-button")[0];
let playMusicButton = document.getElementsByClassName("detail-button")[0];
let player = document.querySelector(".player-wrapper #player");
let videoCloseButton = document.querySelector(".player-wrapper .close-button");
watchButton.addEventListener("click",event => {
    playerWrapper.style.display = "flex";
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    loadPlayer();
});
videoCloseButton.addEventListener("click",event=> {
    player.pause();
    player.currentTime = 0;
    audioPlayer.currentTime=0;
    // audioPlayer.play();
    playerWrapper.style.display = "none";
});

playMusicButton.addEventListener("click",event=>{
     audioPlayer.play();
});