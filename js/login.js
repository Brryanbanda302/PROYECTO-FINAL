const userKey = 'activeUserEmail'; 
const USER_KEY_ALL = 'users';

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