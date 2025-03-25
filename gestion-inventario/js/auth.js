let users = JSON.parse(localStorage.getItem("users")) || [
    { username: "empleado", password: "1234", role: "empleado" },
    { username: "supervisor", password: "admin", role: "supervisor" }
];

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem("role", user.role);
        localStorage.setItem("currentUser", user.username);
        window.location.href = "dashboard.html";
    } else {
        alert("Credenciales incorrectas");
    }
}

function handleEnterLogin(event) {
    if (event.key === "Enter") {
        login();
    }
}

function register() {
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    
    if (users.find(u => u.username === username)) {
        alert("El usuario ya existe");
        return;
    }
    
    users.push({ username, password, role: "empleado" });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registro exitoso, ahora puedes iniciar sesión");
    window.location.href = "login.html";
}

function handleEnterRegister(event) {
    if (event.key === "Enter") {
        register();
    }
}

function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("currentUser");
    window.location.href = "../pages/login.html";
}
