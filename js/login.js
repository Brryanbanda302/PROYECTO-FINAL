const userKey = 'activeUserEmail'; 
const USER_KEY_ALL = 'users';

(function ensureDefaultAdmin() {
    let storedUsers = JSON.parse(localStorage.getItem(USER_KEY_ALL)) || [];

    const defaultAdmin = {
        id: 1,
        name: "Administrador",
        email: "admin@vinilos.com",
        password: "admin123",
        isAdmin: true,
        purchases: []
    };

    const adminExists = storedUsers.some(u => u.email === defaultAdmin.email);

    if (!adminExists) {
        storedUsers.push(defaultAdmin);
        localStorage.setItem(USER_KEY_ALL, JSON.stringify(storedUsers));
        console.log("✔ Administrador creado por defecto");
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value; 
            const password = document.getElementById('password').value;

            const Users = JSON.parse(localStorage.getItem(USER_KEY_ALL)) || [];
            
            const variedUser = Users.find(user => 
                user.email === email
            );
            
            if (variedUser && variedUser.password === password) {
                
                localStorage.setItem(userKey, variedUser.email);
                
                alert(`¡Bienvenido de nuevo, ${variedUser.name}!`);
                
                if (variedUser.isAdmin) {
                    window.location.href = 'admin.html'; 
                } else {
                    window.location.href = 'user.html'; 
                }
                return; 
                
            } else {
                alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
            } 
        });
    }
});
