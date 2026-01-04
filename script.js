// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAyuDH5qy-Wqj1ruNyFq4_7BG7aG9dXwtM",
  authDomain: "chat-app-fecdf.firebaseapp.com",
  databaseURL: "https://chat-app-fecdf-default-rtdb.firebaseio.com",
  projectId: "chat-app-fecdf",
  storageBucket: "chat-app-fecdf.firebasestorage.app",
  messagingSenderId: "175743587052",
  appId: "1:175743587052:web:4a6c9dcd39968ce22a0bc9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let username = "";
let room = "";

function createRoom() {
  username = nameInput.value;
  room = roomInput.value;

  if (!username || !room) {
    alert("Enter name and room");
    return;
  }

  roomTitle.innerText = "Room: " + room;
  chatBox.style.display = "block";

  const roomRef = db.ref("rooms/" + room);

  roomRef.on("child_added", snapshot => {
    const msg = snapshot.val();
    addMessage(msg.user + ": " + msg.text);
  });
}

function sendMessage() {
  const text = msgInput.value;
  if (!text) return;

  db.ref("rooms/" + room).push({
    user: username,
    text: text
  });

  msgInput.value = "";
}

function addMessage(text) {
  const div = document.createElement("div");
  div.innerText = text;
  messages.appendChild(div);
}
