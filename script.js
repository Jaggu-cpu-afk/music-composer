const audioPlayer = document.getElementById("audioPlayer");
const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const equalizer = document.querySelector(".equalizer");
const chatbox = document.getElementById("chatbox");

let currentMood = "neutral";

/* DATA */
const data = {
  happy: { song: "happy.mp3", image: "happy.jpg", title: "Happy Vibes 🎉" },
  sad: { song: "sad.mp3", image: "sad.jpg", title: "Sad Mood 💙" },
  angry: { song: "angry.mp3", image: "angry.jpg", title: "Energy 🔥" },
  neutral: { song: "neutral.mp3", image: "neutral.jpg", title: "Neutral Vibes 🎧" }
};

/* DETECT MOOD */
function detectMood(text) {
  text = text.toLowerCase();
  if (text.includes("happy")) return "happy";
  if (text.includes("sad")) return "sad";
  if (text.includes("angry")) return "angry";
  return "neutral";
}

/* SEND MESSAGE */
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value;

  if (!text) return;

  const mood = detectMood(text);
  currentMood = mood;

  // update UI
  albumArt.src = data[mood].image;
  songTitle.innerText = "Now Playing: " + data[mood].title;

  audioPlayer.src = data[mood].song;
  audioPlayer.play();

  // chat message
  const msg = document.createElement("div");
  msg.innerText = "You: " + text;
  chatbox.appendChild(msg);

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

/* FAVORITE */
function addFavorite() {
  alert("Added to Favorites ❤️");
}
