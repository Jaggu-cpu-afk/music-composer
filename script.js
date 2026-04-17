const chatbox = document.getElementById("chatbox");
const audioPlayer = document.getElementById("audioPlayer");
const albumArt = document.getElementById("albumArt");
const equalizer = document.querySelector(".equalizer");
const musicNotes = document.querySelector(".music-notes");

let currentMood = "neutral";

/* File paths (NO folders) */
const data = {
  happy: { song: "happy.mp3", image: "happy.jpg" },
  sad: { song: "sad.mp3", image: "sad.jpg" },
  angry: { song: "angry.mp3", image: "angry.jpg" },
  neutral: { song: "neutral.mp3", image: "neutral.jpg" }
};

/* Mood detection */
function detectMood(text) {
  text = text.toLowerCase();

  if (text.includes("happy") || text.includes("excited")) return "happy";
  if (text.includes("sad") || text.includes("depressed")) return "sad";
  if (text.includes("angry") || text.includes("mad")) return "angry";
  return "neutral";
}

/* Bot reply */
function botReply(mood) {
  if (mood === "happy") return "Awesome! Keep smiling 😄";
  if (mood === "sad") return "I’m here for you 💙";
  if (mood === "angry") return "Relax… breathe 🔥";
  return "Enjoy the vibe 🎧";
}

/* Typing effect */
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

/* Main function */
function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value;

  if (!userText) return;

  chatbox.innerHTML += `<div class="user">${userText}</div>`;

  const mood = detectMood(userText);
  currentMood = mood;

  const reply = botReply(mood);
  setTimeout(() => typeEffect(reply), 400);

  /* Update media */
  audioPlayer.src = data[mood].song;
  albumArt.src = data[mood].image;

  audioPlayer.play().catch(() => {
    alert("Click play button if audio doesn't start");
  });

  /* Start animations */
  equalizer.classList.add("active");
  musicNotes.classList.add("active");

  input.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}

/* Stop animations */
audioPlayer.onpause = () => {
  equalizer.classList.remove("active");
  musicNotes.classList.remove("active");
};

audioPlayer.onended = () => {
  equalizer.classList.remove("active");
  musicNotes.classList.remove("active");
};

/* Favorites */
function addFavorite() {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs.push(currentMood);
  localStorage.setItem("favorites", JSON.stringify(favs));
  alert("Added to favorites ❤️");
}
