const chatbox = document.getElementById("chatbox");
const audioPlayer = document.getElementById("audioPlayer");
const albumArt = document.getElementById("albumArt");
const equalizer = document.querySelector(".equalizer");
const musicNotes = document.querySelector(".music-notes");

let currentMood = "neutral";

/* ===== DATA ===== */
const data = {
  happy: { song: "happy.mp3", image: "happy.jpg" },
  sad: { song: "sad.mp3", image: "sad.jpg" },
  angry: { song: "angry.mp3", image: "angry.jpg" },
  neutral: { song: "neutral.mp3", image: "neutral.jpg" }
};

/* ===== 🔥 PRELOAD AUDIO (NO DELAY FIX) ===== */
const audioCache = {};

for (let mood in data) {
  audioCache[mood] = new Audio(data[mood].song);
}

/* ===== MOOD DETECTION ===== */
function detectMood(text) {
  text = text.toLowerCase();

  if (text.includes("happy") || text.includes("excited")) return "happy";
  if (text.includes("sad") || text.includes("depressed")) return "sad";
  if (text.includes("angry") || text.includes("mad")) return "angry";

  return "neutral";
}

/* ===== BOT RESPONSE ===== */
function botReply(mood) {
  if (mood === "happy") return "Awesome! Keep smiling 😄";
  if (mood === "sad") return "I’m here for you 💙";
  if (mood === "angry") return "Relax… breathe 🔥";
  return "Enjoy the vibe 🎧";
}

/* ===== TYPING EFFECT ===== */
function typeEffect(text) {
  let i = 0;
  const div = document.createElement("div");
  div.className = "bot";
  chatbox.appendChild(div);

  const interval = setInterval(() => {
    div.innerHTML += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 30);
}

/* ===== MAIN FUNCTION ===== */
function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value;

  if (!userText) return;

  /* Show user text */
  chatbox.innerHTML += `<div class="user">${userText}</div>`;

  /* Detect mood */
  const mood = detectMood(userText);
  currentMood = mood;

  /* Bot reply */
  const reply = botReply(mood);
  setTimeout(() => typeEffect(reply), 400);

  /* 🔥 INSTANT AUDIO PLAY */
  audioPlayer.src = audioCache[mood].src;
  audioPlayer.currentTime = 0;

  audioPlayer.play().catch(() => {
    alert("Click play button if audio doesn't start");
  });

  /* Update image */
  albumArt.src = data[mood].image;

  /* Clear input */
  input.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}

/* ===== AUDIO EVENTS (SYNC ANIMATIONS) ===== */

/* Play / Resume */
audioPlayer.onplay = () => {
  equalizer.classList.add("active");
  musicNotes.classList.add("active");
};

/* Pause */
audioPlayer.onpause = () => {
  equalizer.classList.remove("active");
  musicNotes.classList.remove("active");
};

/* End */
audioPlayer.onended = () => {
  equalizer.classList.remove("active");
  musicNotes.classList.remove("active");
};

/* ===== FAVORITES ===== */
function addFavorite() {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs.push(currentMood);
  localStorage.setItem("favorites", JSON.stringify(favs));
  alert("Added to favorites ❤️");
}
