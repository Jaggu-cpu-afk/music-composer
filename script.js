const audioPlayer = document.getElementById("audioPlayer");
const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const equalizer = document.querySelector(".equalizer");
const musicNotes = document.querySelector(".music-notes");
const chatbox = document.getElementById("chatbox");

const data = {
  happy: { song: "images/happy.mp3", image: "images/happy.jpg", title: "Happy Vibes 🎉" },
  sad: { song: "images/sad.mp3", image: "images/sad.jpg", title: "Sad Mood 💙" },
  angry: { song: "images/angry.mp3", image: "images/angry.jpg", title: "Energy 🔥" },
  neutral: { song: "images/neutral.mp3", image: "images/neutral.jpg", title: "Neutral Vibes 🎧" }
};

function detectMood(text) {
  text = text.toLowerCase();
  if (text.includes("happy")) return "happy";
  if (text.includes("sad")) return "sad";
  if (text.includes("angry")) return "angry";
  return "neutral";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value;
  if (!text) return;

  const mood = detectMood(text);

  albumArt.src = data[mood].image;
  songTitle.innerText = "Now Playing: " + data[mood].title;

  audioPlayer.src = data[mood].song;
  audioPlayer.play();

  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user");
  userMsg.innerText = text;
  chatbox.appendChild(userMsg);

  const botMsg = document.createElement("div");
  botMsg.classList.add("message", "bot");
  botMsg.innerText = "You are in " + mood + " mood";
  chatbox.appendChild(botMsg);

  chatbox.scrollTop = chatbox.scrollHeight;

  input.value = "";
}

/* ANIMATION */
audioPlayer.onplay = () => {
  equalizer.classList.add("active");
  musicNotes.classList.add("active");
};

audioPlayer.onpause = () => {
  equalizer.classList.remove("active");
  musicNotes.classList.remove("active");
};

audioPlayer.onended = () => {
  equalizer.classList.remove("active");
  musicNotes.classList.remove("active");
};

function addFavorite() {
  alert("Added ❤️");
}