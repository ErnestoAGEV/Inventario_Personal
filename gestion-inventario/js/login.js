function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username].password === password) {
        localStorage.setItem("currentUser", username);
        localStorage.setItem("role", users[username].role);
        
        window.location.href = "../pages/dashboard.html";
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function registerUser(role) {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("El usuario ya existe.");
        return;
    }

    users[username] = { password, role };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuario registrado correctamente.");
    window.location.href = "../pages/login.html";
}
