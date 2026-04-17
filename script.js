const audioPlayer = document.getElementById("audioPlayer");
const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const equalizer = document.querySelector(".equalizer");

let currentMood = "neutral";

const data = {
  happy: { song: "happy.mp3", image: "happy.jpg", title: "Happy Vibes 🎉" },
  sad: { song: "sad.mp3", image: "sad.jpg", title: "Sad Mood 💙" },
  angry: { song: "angry.mp3", image: "angry.jpg", title: "Energy 🔥" },
  neutral: { song: "neutral.mp3", image: "neutral.jpg", title: "Neutral Vibes 🎧" }
};

/* PRELOAD */
const audioCache = {};
for (let mood in data) {
  audioCache[mood] = new Audio(data[mood].song);
}

/* DETECT MOOD */
function detectMood(text) {
  text = text.toLowerCase();
  if (text.includes("happy")) return "happy";
  if (text.includes("sad")) return "sad";
  if (text.includes("angry")) return "angry";
  return "neutral";
}

/* SEND */
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value;

  if (!text) return;

  const mood = detectMood(text);
  currentMood = mood;

  albumArt.src = data[mood].image;
  songTitle.innerText = "Now Playing: " + data[mood].title;

  audioPlayer.src = audioCache[mood].src;
  audioPlayer.currentTime = 0;
  audioPlayer.play();

  input.value = "";
}

/* ANIMATION */
audioPlayer.onplay = () => {
  equalizer.classList.add("active");
};

audioPlayer.onpause = () => {
  equalizer.classList.remove("active");
};

audioPlayer.onended = () => {
  equalizer.classList.remove("active");
};

function addFavorite() {
  alert("Added ❤️");
}
