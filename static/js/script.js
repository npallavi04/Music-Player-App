// document.addEventListener("DOMContentLoaded", function () {
//   const audioPlayer = document.getElementById("audioPlayer");
//   const playPauseBtn = document.getElementById("playPauseBtn");
//   const prevBtn = document.getElementById("prevBtn");
//   const nextBtn = document.getElementById("nextBtn");
//   const seekBar = document.getElementById("seekBar");
//   const volumeBar = document.getElementById("volumeBar");
//   const progressBar = document.getElementById("progressBar");
//   const currentSong = document.getElementById("currentSong");
//   const fileInput = document.getElementById("fileInput");
//   const uploadBtn = document.getElementById("uploadBtn");
//   const songDropdown = document.getElementById("songDropdown");
//   const shuffleBtn = document.getElementById("shuffleBtn");
//   const repeatBtn = document.getElementById("repeatBtn");
//   const songCounter = document.getElementById("songCounter");
//   const themeToggle = document.getElementById("themeToggle");
//   const albumCover = document.getElementById("albumCover");
//   const currentTimeEl = document.getElementById("currentTime");
//   const totalTimeEl = document.getElementById("totalTime");

//   let playlist = [];
//   let currentIndex = 0;
//   let isShuffle = false;
//   let isRepeat = false;

//   uploadBtn.addEventListener("click", async function () {
//     const files = fileInput.files;

//     if (files.length === 0) {
//       alert("Please select mp3 files");
//       return;
//     }

//     for (let file of files) {
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const response = await fetch("/upload", {
//           method: "POST",
//           body: formData,
//         });

//         const data = await response.json();

//         if (data.url) {
//           playlist.push({ name: file.name, url: data.url });
//           updatePlaylist();
//         } else {
//           console.error(data.error);
//         }
//       } catch (error) {
//         console.error("Upload failed:", error);
//       }
//     }
//   });

//   function updatePlaylist() {
//     songDropdown.innerHTML = '<option value="">-- Select a Song --</option>';

//     playlist.forEach((song, index) => {
//       const option = document.createElement("option");
//       option.value = index;
//       option.textContent = song.name;
//       songDropdown.appendChild(option);
//     });
//   }

//   songDropdown.addEventListener("change", function () {
//     const index = songDropdown.value;
//     if (index !== "") {
//       playSong(index);
//     }
//   });

//   function playSong(index) {
//     songCounter.textContent = `${parseInt(currentIndex) + 1} / ${playlist.length}`;
//     albumCover.src = "/static/default.jpg";

//     if (!playlist.length) return;

//     currentIndex = index;
//     audioPlayer.src = playlist[index].url;
//     audioPlayer.play();
//     currentSong.textContent = playlist[index].name;
//     playPauseBtn.textContent = "⏸️";
//   }

//   playPauseBtn.addEventListener("click", function () {
//     if (!audioPlayer.src) return;

//     if (audioPlayer.paused) {
//       audioPlayer.play();
//       playPauseBtn.textContent = "⏸️";
//     } else {
//       audioPlayer.pause();
//       playPauseBtn.textContent = "▶️";
//     }
//   });

//   prevBtn.addEventListener("click", function () {
//     if (!playlist.length) return;
//     currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
//     playSong(currentIndex);
//   });

//   nextBtn.addEventListener("click", function () {
//     if (!playlist.length) return;
//     currentIndex = (currentIndex + 1) % playlist.length;
//     playSong(currentIndex);
//   });

//   seekBar.addEventListener("input", function () {
//     audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
//   });

//   audioPlayer.addEventListener("timeupdate", function () {
//     if (audioPlayer.duration) {
//       const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
//       seekBar.value = progress;
//       progressBar.style.width = progress + "%";
//     }
//   });

//   volumeBar.addEventListener("input", function () {
//     audioPlayer.volume = volumeBar.value;
//   });

//   audioPlayer.addEventListener("ended", function () {
//     nextBtn.click();
//   });
// });

// audioPlayer.addEventListener("loadedmetadata", () => {
//   totalTimeEl.textContent = formatTime(audioPlayer.duration);
// });

// audioPlayer.addEventListener("timeupdate", () => {
//   currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
// });

// audioPlayer.addEventListener("ended", () => {
//   if(isRepeat){
//     playSong(currentIndex);
//   } else if(isShuffle){
//     let random = Math.floor(Math.random() * playlist.length);
//     playSong(random);
//   } else {
//     nextBtn.click();
//   }
// });


// function formatTime(time){
//   let min = Math.floor(time/60);
//   let sec = Math.floor(time%60);
//   if(sec < 10) sec = "0"+sec;
//   return `${min}:${sec}`;
// }

// shuffleBtn.onclick = () => {
//   isShuffle = !isShuffle;
//   shuffleBtn.style.color = isShuffle ? "yellow" : "white";
// };


// repeatBtn.onclick = () => {
//   isRepeat = !isRepeat;
//   repeatBtn.style.color = isRepeat ? "yellow" : "white";
// };


// themeToggle.onclick = () => {
//   document.body.classList.toggle("light-mode");
// };


document.addEventListener("DOMContentLoaded", function () {

  const audioPlayer = document.getElementById("audioPlayer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const seekBar = document.getElementById("seekBar");
  const volumeBar = document.getElementById("volumeBar");
  const progressBar = document.getElementById("progressBar");
  const currentSong = document.getElementById("currentSong");
  const fileInput = document.getElementById("fileInput");
  const uploadBtn = document.getElementById("uploadBtn");
  const songDropdown = document.getElementById("songDropdown");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const repeatBtn = document.getElementById("repeatBtn");
  const songCounter = document.getElementById("songCounter");
  const themeToggle = document.getElementById("themeToggle");
  const albumCover = document.getElementById("albumCover");
  const currentTimeEl = document.getElementById("currentTime");
  const totalTimeEl = document.getElementById("totalTime");

  let playlist = [];
  let currentIndex = 0;
  let isShuffle = false;
  let isRepeat = false;

  uploadBtn.addEventListener("click", async function () {
    const files = fileInput.files;
    if (files.length === 0) {
      alert("Please select mp3 files");
      return;
    }

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        playlist.push({ name: file.name, url: data.url });
        updatePlaylist();
      }
    }
  });

  function updatePlaylist() {
    songDropdown.innerHTML = '<option value="">-- Select a Song --</option>';
    playlist.forEach((song, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = song.name;
      songDropdown.appendChild(option);
    });
  }

  songDropdown.addEventListener("change", function () {
    playSong(this.value);
  });

  function playSong(index) {
    if (!playlist.length) return;

    currentIndex = index;
    audioPlayer.src = playlist[index].url;
    audioPlayer.play();
    currentSong.textContent = playlist[index].name;
    playPauseBtn.textContent = "⏸️";
    songCounter.textContent = `${parseInt(index)+1} / ${playlist.length}`;
  }

  playPauseBtn.addEventListener("click", function () {
    if (!audioPlayer.src) return;

    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.textContent = "⏸️";
    } else {
      audioPlayer.pause();
      playPauseBtn.textContent = "▶️";
    }
  });

  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    playSong(currentIndex);
  };

  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(currentIndex);
  };

  audioPlayer.addEventListener("timeupdate", () => {
    let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekBar.value = progress;
    progressBar.style.width = progress + "%";
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
  });

  audioPlayer.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audioPlayer.duration);
  });

  shuffleBtn.onclick = () => isShuffle = !isShuffle;
  repeatBtn.onclick = () => isRepeat = !isRepeat;

  function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (sec < 10) sec = "0" + sec;
    return `${min}:${sec}`;
  }

});
