let inventory = JSON.parse(localStorage.getItem("inventory")) || {};
const currentUser = localStorage.getItem("currentUser");
if (!inventory[currentUser]) inventory[currentUser] = [];

function addItem() {
    const name = document.getElementById("item-name").value;
    const quantity = document.getElementById("item-quantity").value;

    if (name && quantity) {
        inventory[currentUser].push({ name, quantity });
        localStorage.setItem("inventory", JSON.stringify(inventory));
        updateInventory();
        document.getElementById("item-name").value = "";
        document.getElementById("item-quantity").value = "";
    } else {
        alert("Por favor, completa todos los campos.");
    }
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

document.addEventListener("DOMContentLoaded", () => {
    // Actualizar el mensaje de bienvenida
    const welcomeMessage = document.getElementById("welcome-message");
    if (currentUser) {
        welcomeMessage.textContent = `Hola, ${currentUser}! Bienvenido a tu inventario personal.`;
    }

    // Cargar el inventario
    updateInventory();
});