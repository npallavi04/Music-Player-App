

document.addEventListener('DOMContentLoaded', function() {

    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const seekBar = document.getElementById('seekBar');
    const volumeBar = document.getElementById('volumeBar');
    const progressBar = document.getElementById('progressBar');
    const currentSong = document.getElementById('currentSong');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const songDropdown = document.getElementById('songDropdown');


    let playlist = [];
    let currentIndex = 0;

    uploadBtn.addEventListener('click', async function() {
        const files = fileInput.files;

        if (files.length === 0) {
            alert("Please select mp3 files");
            return;
        }

        for (let file of files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.url) {
                    playlist.push({ name: file.name, url: data.url });
                    updatePlaylist();
                } else {
                    console.error(data.error);
                }

            } catch (error) {
                console.error("Upload failed:", error);
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

    songDropdown.addEventListener('change', function () {
    const index = songDropdown.value;
    if (index !== "") {
        playSong(index);
    }
});



    function playSong(index) {
        if (!playlist.length) return;

        currentIndex = index;
        audioPlayer.src = playlist[index].url;
        audioPlayer.play();
        currentSong.textContent = playlist[index].name;
        playPauseBtn.textContent = '⏸️';
    }

    playPauseBtn.addEventListener('click', function() {
        if (!audioPlayer.src) return;

        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = '▶️';
        }
    });

    prevBtn.addEventListener('click', function() {
        if (!playlist.length) return;
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        playSong(currentIndex);
    });

    nextBtn.addEventListener('click', function() {
        if (!playlist.length) return;
        currentIndex = (currentIndex + 1) % playlist.length;
        playSong(currentIndex);
    });

    seekBar.addEventListener('input', function() {
        audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
    });

    audioPlayer.addEventListener('timeupdate', function() {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            seekBar.value = progress;
            progressBar.style.width = progress + "%";
        }
    });

    volumeBar.addEventListener('input', function() {
        audioPlayer.volume = volumeBar.value;
    });

    audioPlayer.addEventListener('ended', function() {
        nextBtn.click();
    });

});
