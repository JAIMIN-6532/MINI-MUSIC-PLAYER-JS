const songs = [
  {id: "s1", sname: "Shape of You", artist: "Ed Sheeran", img: "images/alan.jpg", genre: "pop", source: "Music/FEEL_THE_LOVE___MASHUP__DJ_RHN_ROHAN___2018___ATIF_ASLAM_ARJIT_SINGH(256k).mp3"},
  {id: "s2", sname: "Faded", artist: "Alan Walker", img: "images/arman.jpg", genre: "hiphop", source: "Music/Aashiyan_-_Barfi_Pritam_Shreya_Nikhil_Paul_George_Ranbir_Priyanka(256k).mp3"},
  {id: "s3", sname: "Mighty Raju", artist: "KK", img: "images/kk.jpg", genre: "pop", source: "Music/Locked_Away_Mashup_(Sush_&_Yohan_x_Aaron_Aamir)(256k).mp3"},
  {id: "s4", sname: "Tere Bin", artist: "Kishor", img: "images/kishor.jpg", genre: "rock", source: "Music/Dekha_Ek_Khwab_x_Laila_.mp3"},
  {id: "s5", sname: "Believer", artist: "Imagine Dragons", img: "images/chill.jpg", genre: "hiphop", source: "Music/Something.mp3"}
];

const songList = document.querySelector(".all-song-container");
const selectType = document.getElementById("songtype");
const cardImg = document.querySelector(".card");
const playButton = document.querySelector(".playButton");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const songAudio = document.querySelector(".audiotag");
const playlistBtn = document.querySelector(".AddPlaylist");
const playlistNameInput = document.getElementById("playlistName");
const createBtn = document.querySelector(".createPlaylist");
const currentPlaylist = document.querySelector(".currentPlaylist");
const allPlaylistsContainer = document.querySelector(".newPlaylist");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const searchSongInput = document.getElementById("searchSongInput");
const searchPlaylistInput = document.getElementById("searchPlaylistInput");

let currentSongIndex = 0;
let filteredSongs = songs;
let allPlaylists = [];
let selectedPlaylist = null;

function ShowSongs(filteredSongs) {
  songList.innerHTML = "";
  filteredSongs.forEach((song, index) => {
      const songDiv = document.createElement("div");
      songDiv.className = "songdivclass";
      songDiv.dataset.img = song.img;
      songDiv.textContent = `${song.sname} - ${song.artist}`;
      songDiv.addEventListener("click", () => {
          currentSongIndex = index;
          renderCurrentSong(song);
      });
      songList.appendChild(songDiv);
  });
}

function renderCurrentSong(song) {
  cardImg.innerHTML = `<img src="${song.img}" class="song-image">`;
  const songName = document.createElement("h3");
  songName.textContent = song.sname;
  const artistName = document.createElement("h5");
  artistName.textContent = song.artist;
  cardImg.appendChild(songName);
  cardImg.appendChild(artistName);
  songAudio.src = song.source;
}

function changeSong(direction) {
  if (direction === "next") {
      currentSongIndex = (currentSongIndex + 1) % filteredSongs.length;
  } else if (direction === "prev") {
      currentSongIndex = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
  }
  renderCurrentSong(filteredSongs[currentSongIndex]);
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

function createPlaylist() {
  const playlistName = playlistNameInput.value.trim();
  if (playlistName) {
      const playlist = {
          name: playlistName,
          songs: []
      };
      allPlaylists.push(playlist);
      renderPlaylists();
      playlistNameInput.value = "";
  }
}

function renderPlaylists() {
  allPlaylistsContainer.innerHTML = "";
  allPlaylists.forEach(playlist => {
      const playlistDiv = document.createElement("div");
      playlistDiv.className = "playlist-item";
      playlistDiv.textContent = playlist.name;
      playlistDiv.addEventListener("click", () => {
          selectPlaylist(playlist);
      });
      allPlaylistsContainer.appendChild(playlistDiv);
  });
}

function selectPlaylist(playlist) {
  selectedPlaylist = playlist;
  document.querySelectorAll(".playlist-item").forEach(item => item.classList.remove("selected"));
  const selectedDiv = Array.from(document.querySelectorAll(".playlist-item")).find(item => item.textContent === playlist.name);
  if (selectedDiv) {
      selectedDiv.classList.add("selected");
  }
  displayPlaylistSongs(playlist);
}

function displayPlaylistSongs(playlist) {
  currentPlaylist.innerHTML = "";
  playlist.songs.forEach((song, index) => {
      const songItem = document.createElement("div");
      songItem.textContent = `${song.sname} - ${song.artist}`;
      songItem.addEventListener("click", () => removeSongFromPlaylist(playlist, index));
      currentPlaylist.appendChild(songItem);
  });
}

function removeSongFromPlaylist(playlist, songIndex) {
  playlist.songs.splice(songIndex, 1);
  displayPlaylistSongs(playlist);
}

function addToPlaylist() {
  if (selectedPlaylist) {
      selectedPlaylist.songs.push(filteredSongs[currentSongIndex]);
      displayPlaylistSongs(selectedPlaylist);
  }
}

function searchSongs() {
  const searchTerm = searchSongInput.value.toLowerCase();
  const searchedSongs = songs.filter(song => song.sname.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm));
  ShowSongs(searchedSongs);
}

function searchPlaylists() {
  const searchTerm = searchPlaylistInput.value.toLowerCase();
  const searchedPlaylists = allPlaylists.filter(playlist => playlist.name.toLowerCase().includes(searchTerm));
  allPlaylistsContainer.innerHTML = "";
  searchedPlaylists.forEach(playlist => {
      const playlistDiv = document.createElement("div");
      playlistDiv.className = "playlist-item";
      playlistDiv.textContent = playlist.name;
      playlistDiv.addEventListener("click", () => {
          selectPlaylist(playlist);
      });
      allPlaylistsContainer.appendChild(playlistDiv);
  });
}

ShowSongs(filteredSongs);
renderCurrentSong(filteredSongs[currentSongIndex]);

selectType.addEventListener("change", () => {
  const selectedGenre = selectType.value;
  filteredSongs = selectedGenre === "all" ? songs : songs.filter(song => song.genre === selectedGenre);
  currentSongIndex = 0;
  ShowSongs(filteredSongs);
  renderCurrentSong(filteredSongs[currentSongIndex]);
});

nextButton.addEventListener("click", () => changeSong("next"));
prevButton.addEventListener("click", () => changeSong("prev"));
toggleThemeBtn.addEventListener("click", toggleTheme);
createBtn.addEventListener("click", createPlaylist);
playlistBtn.addEventListener("click", addToPlaylist);
searchSongInput.addEventListener("input", searchSongs);
searchPlaylistInput.addEventListener("input", searchPlaylists);


