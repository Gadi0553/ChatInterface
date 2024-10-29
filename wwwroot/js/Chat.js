/// <reference path="../microsoft/signalr/dist/browser/signalr.js" />

var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

let isUserNameSet = false; // Variable para rastrear si el nombre está establecido

connection.on("ReceiveMessage", function (user, message) {
    addMessageToList(user, message);
});

connection.start().then(() => {
    console.log("Connection established");
}).catch((err) => {
    console.error(err.toString());
});

// Agregar evento al botón de enviar
document.querySelector("#send-button").addEventListener("click", (e) => {
    e.preventDefault();
    const userInput = document.querySelector("#user-input");
    const user = userInput.value.trim();
    const message = document.querySelector("#message-input").value.trim();

    // Verificar si el nombre de usuario ya está establecido
    if (!isUserNameSet) {
        if (user) {
            userInput.disabled = true; // Deshabilitar el campo de nombre
            isUserNameSet = true; // Marcar que el nombre ha sido establecido
           // Mensaje de confirmación
        } else {
            alert("Please enter a username."); // Avisar si el campo está vacío
            return;
        }
    }

    // Enviar el mensaje si hay contenido
    if (message) {
        console.log("Sent:", user, message);
        connection.invoke("SendMessage", user, message).catch((err) => {
            console.error(err.toString());
        });
    } else {
        alert("Please enter a message."); // Avisar si el campo de mensaje está vacío
    }
});

// Función para agregar mensajes a la lista
function addMessageToList(user, message) {
    const ul = document.querySelector("#message-list");
    const li = document.createElement("li");
    li.classList.add("message-item", "mb-2", "p-2", "border", "rounded");

    // Crear span para el mensaje
    const messageSpan = document.createElement("span");
    messageSpan.textContent = `${user}: ${message}`;

    // Crear contenedor para los botones
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("mt-2"); // Añadir margen superior para el espaciado

    // Crear botón Editar
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-warning", "btn-sm", "mr-2");
    editButton.onclick = () => editMessage(messageSpan, message);

    // Crear botón Eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    deleteButton.onclick = () => li.remove();

    // Añadir botones al contenedor de botones
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Añadir el mensaje y el contenedor de botones al elemento de lista
    li.appendChild(messageSpan);
    li.appendChild(buttonContainer);
    ul.appendChild(li);
}

// Función para editar mensajes
function editMessage(messageSpan, oldMessage) {
    const newMessage = prompt("Edit your message:", oldMessage);
    if (newMessage !== null && newMessage.trim() !== "") {
        messageSpan.textContent = messageSpan.textContent.split(":")[0] + ": " + newMessage;
    }
}
