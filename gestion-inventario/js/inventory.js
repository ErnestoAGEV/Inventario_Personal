let inventory = JSON.parse(localStorage.getItem("inventory")) || {};
const currentUser = localStorage.getItem("currentUser");
if (!inventory[currentUser]) inventory[currentUser] = [];

// Función para mostrar notificaciones
function showNotification(message, type = "success") {
    const notificationContainer = document.getElementById("notification-container");
    const notification = document.createElement("div");

    // Estilo de la notificación
    notification.className = `alert alert-${type} alert-dismissible fade show text-center shadow-sm`;
    notification.role = "alert";
    notification.style.fontSize = "0.9rem"; // Texto más pequeño
    notification.style.padding = "10px 20px"; // Relleno adicional para evitar que el texto se encime con la 'x'
    notification.style.marginTop = "10px"; // Espaciado entre notificaciones
    notification.innerHTML = `
        <span>${message}</span>
    `;

    // Agregar la notificación al contenedor
    notificationContainer.appendChild(notification);

    // Eliminar la notificación automáticamente después de 3 segundos
    setTimeout(() => {
        notification.classList.remove("show");
        notification.classList.add("hide");
        setTimeout(() => notification.remove(), 500); // Esperar a que termine la animación
    }, 3000);
}

function addItem() {
    const name = document.getElementById("item-name").value.trim();
    const quantity = document.getElementById("item-quantity").value.trim();

    if (!name || !quantity) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Verificar si el producto ya existe
    const existingItem = inventory[currentUser].find(item => item.name.toLowerCase() === name.toLowerCase());
    if (existingItem) {
        alert("El producto ya existe en el inventario.");
        return;
    }

    // Agregar el nuevo producto
    inventory[currentUser].push({ name, quantity });
    localStorage.setItem("inventory", JSON.stringify(inventory));
    updateInventory();

    // Mostrar notificación de éxito
    showNotification("Producto agregado correctamente.");

    // Limpiar los campos de entrada
    document.getElementById("item-name").value = "";
    document.getElementById("item-quantity").value = "";
}

function handleEnterAdd(event) {
    if (event.key === "Enter") {
        addItem();
    }
}

function removeItem(index) {
    inventory[currentUser].splice(index, 1);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    updateInventory();
}

function editItem(index) {
    const newName = prompt("Nuevo nombre del producto:", inventory[currentUser][index].name);
    const newQuantity = prompt("Nueva cantidad:", inventory[currentUser][index].quantity);
    
    if (newName !== null && newQuantity !== null) {
        inventory[currentUser][index] = { name: newName, quantity: newQuantity };
        localStorage.setItem("inventory", JSON.stringify(inventory));
        updateInventory();
    }
}

function updateInventory() {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = "";
    
    inventory[currentUser].forEach((item, index) => {
        const itemElement = document.createElement("tr");
        itemElement.className = "text-center";
        itemElement.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>
                <button class='btn btn-warning btn-sm me-2' onclick='editItem(${index})'>Editar</button>
                <button class='btn btn-danger btn-sm' onclick='removeItem(${index})'>Eliminar</button>
            </td>`;
        inventoryList.appendChild(itemElement);
    });
}

function filterInventory() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = "";

    inventory[currentUser]
        .filter(item => item.name.toLowerCase().includes(searchTerm))
        .forEach((item, index) => {
            const itemElement = document.createElement("tr");
            itemElement.className = "text-center";
            itemElement.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>
                    <button class='btn btn-warning btn-sm me-2' onclick='editItem(${index})'>Editar</button>
                    <button class='btn btn-danger btn-sm' onclick='removeItem(${index})'>Eliminar</button>
                </td>`;
            inventoryList.appendChild(itemElement);
        });
}

function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("currentUser");
    window.location.href = "../pages/login.html";
}

// Permitir solo letras en el campo de nombre
function validateLetters(event) {
    const charCode = event.charCode || event.keyCode;
    const char = String.fromCharCode(charCode);
    const regex = /^[a-zA-Z\s]+$/; // Solo letras y espacios

    if (!regex.test(char)) {
        event.preventDefault();
    }
}

// Permitir solo números en el campo de cantidad
function validateNumbers(event) {
    const charCode = event.charCode || event.keyCode;
    const char = String.fromCharCode(charCode);
    const regex = /^[0-9]+$/; // Solo números

    if (!regex.test(char)) {
        event.preventDefault();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Actualizar el mensaje de bienvenida
    const welcomeMessage = document.getElementById("welcome-message");
    if (currentUser) {
        welcomeMessage.textContent = `Hola, ${currentUser}! Bienvenido a tu inventario personal.`;
    }

    // Cargar el inventario
    updateInventory();

    // Agregar campos de entrada
    const inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = `
        <div class="mb-3">
            <input type="text" id="item-name" class="form-control" placeholder="Nombre del producto" onkeypress="validateLetters(event)">
        </div>
        <div class="mb-3">
            <input type="number" id="item-quantity" class="form-control" placeholder="Cantidad" onkeypress="handleEnterAdd(event)">
        </div>
    `;
});