const idUsuario = 'userActivo'; 
const llaveUsuario_ALL = 'users';

(function defultAdmin() {
    let adminDefecto = JSON.parse(localStorage.getItem(llaveUsuario_ALL)) || [];

    const defaultAdmin = {
        id: 1,
        name: "Administrador",
        email: "admin@vinilos.com",
        password: "admin123",
        isAdmin: true,
        purchases: []
    };

    const adminExistente = adminDefecto.some(u => u.email === defaultAdmin.email);

    if (!adminExistente) {
        adminDefecto.push(defaultAdmin);
        localStorage.setItem(llaveUsuario_ALL, JSON.stringify(adminDefecto));
        console.log("✔ Administrador creado por defecto");
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');
    
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value; 
            const password = document.getElementById('password').value;

            const Users = JSON.parse(localStorage.getItem(llaveUsuario_ALL)) || [];
            
            const variedUser = Users.find(user => 
                user.email === email
            );
            
            if (variedUser && variedUser.password === password) {
                
                localStorage.setItem(idUsuario, variedUser.email);
                
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
