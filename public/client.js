const socket = io();

let name;

let textarea = document.querySelector("#textarea");

let messageArea = document.querySelector(".message__area");

do {
  name = prompt("Please Enter Your Name:");
} while (!name);

textarea.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage(event.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  //Append
  appendMessage(msg, "outgoing");

  textarea.value = "";

  // Send to Server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;

  mainDiv.classList.add(className, "message");

  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `;

  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);

  scrollTOButtom();
}

//Recieve

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
});

function scrollTOButtom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
