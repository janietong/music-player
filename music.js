
        let now_playing = document.querySelector(".now-playing");
        let track_art = document.querySelector(".track-art");
        let track_name = document.querySelector(".track-name");
        let track_artist = document.querySelector(".track-artist");
        
        let playpause_btn = document.querySelector(".playpause-track");
        let next_btn = document.querySelector(".next-track");
        let prev_btn = document.querySelector(".prev-track");
        
        let seek_slider = document.querySelector(".seek_slider");
        let volume_slider = document.querySelector(".volume_slider");
        let curr_time = document.querySelector(".current-time");
        let total_duration = document.querySelector(".total-duration");
        
        let track_index = 0;
        let isPlaying = false;
        let updateTimer;
        
        // Create new audio element
        let curr_track = document.createElement('audio');
        
        // Define the tracks that have to be played
        let track_list = [
          {
            name: "Take It Back",
            artist: "Crowmander",
            image: "https://i0.wp.com/olumuse.org/wp-content/uploads/2020/12/pasted-image-0-6.png?fit=474%2C324&ssl=1",
            path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/qpYGaUZD07DdvVXL1qYxcgwDoxwYIYaOursbHJRi.mp3?download=1&name=Crowander%20-%20Take%20it%20Back.mp3"
          },
          {
            name: "Balloon Waltz Memory",
            artist: "Dana Boulé",
            image: "https://storage.googleapis.com/pai-images/781dbb6614cc41da819bd363caf64eb4.jpeg",
            path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Dana_Boul/Blue_Piano/Dana_Boul_-_02_-_Balloon_Waltz_Memory.mp3?download=1&name=Dana%20Boul%C3%A9%20-%20Balloon%20Waltz%20Memory.mp3"
          },
          {
            name: "Shipping Lanes",
            artist: "Chad Crouch",
            image: "https://a-american.com/wp-content/uploads/2020/12/shippingcontainers.jpg",
            path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
          },
          {
            name: "Good Morning",
            artist: "Serge Quadrado",
            image: "https://i.pinimg.com/originals/99/6a/ec/996aeceeb178f90519d871af662371b8.jpg",
            path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/ZyBGYJ68VTt5DmUimYKLUrCTRqKbSwpsynkzM7wa.mp3?download=1&name=Serge%20Quadrado%20-%20Good%20Morning.mp3",
          },
          {
            name: "Summer Rain",
            artist: "Maestro One",
            image: "https://i.pinimg.com/550x/86/ed/f1/86edf14218eaed6970097bdc5f470ebb.jpg",
            path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/C8TlceNr43lVFwynvcLLoGYrLEVOBo35yishaG7C.mp3?download=1&name=Maestro%20One%20-%20Summer%20Rain.mp3",
          },
        ];
         
        
        function loadTrack(track_index) {
          clearInterval(updateTimer);
          resetValues();
        
          // Load a new track
          curr_track.src = track_list[track_index].path;
          curr_track.load();
        
          // Update details of the track
          track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
          track_name.textContent = track_list[track_index].name;
          track_artist.textContent = track_list[track_index].artist;
          now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
        
          // Set an interval of 1000 milliseconds for updating the seek slider
          updateTimer = setInterval(seekUpdate, 1000);
        
          // Move to the next track if the current one finishes playing
          curr_track.addEventListener("ended", nextTrack);
        
          // Apply a random background color
          random_bg_color();
        }
        
        function random_bg_color() {
        
          // Get a random number for colors
          let red = Math.floor(Math.random() * 200) + 100;
          let green = Math.floor(Math.random() * 200) + 100;
          let blue = Math.floor(Math.random() * 200) + 100;
        
          // Construct a color withe the given values
          let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
        
          // Set the background to that color
          document.body.style.background = bgColor;
        }
        
        // Reset Values
        function resetValues() {
          curr_time.textContent = "00:00";
          total_duration.textContent = "00:00";
          seek_slider.value = 0;
        }
        
        function playpauseTrack() {
          if (!isPlaying) playTrack();
          else pauseTrack();
        }
        
        function playTrack() {
          curr_track.play();
          isPlaying = true;
        
          // Replace icon with the pause icon
          playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
          curr_track.pause();
          isPlaying = false;
        
          // Replace icon with the play icon
          playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
        }
        
        function nextTrack() {
          if (track_index < track_list.length - 1)
            track_index += 1;
          else track_index = 0;
          loadTrack(track_index);
          playTrack();
        }
        
        function prevTrack() {
          if (track_index > 0)
            track_index -= 1;
          else track_index = track_list.length;
          loadTrack(track_index);
          playTrack();
        }
        
        function seekTo() {
          seekto = curr_track.duration * (seek_slider.value / 100);
          curr_track.currentTime = seekto;
        }
        
        function setVolume() {
          curr_track.volume = volume_slider.value / 100;
        }
        
        function seekUpdate() {
          let seekPosition = 0;
        
          // Check if the current track duration is a legible number
          if (!isNaN(curr_track.duration)) {
            seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;
        
            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        
            // Adding a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
          }
        }
        
        // Load the first track in the tracklist
        loadTrack(track_index);
    