const signUpForm = document.querySelector('#signUpForm')
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)
    if (isUserRegistered) {
        return alert('El usuario ya esta registado!')
    }

    
    const newUserId = Users.length > 0 ? Math.max(...Users.map(u => u.id || 0)) + 1 : 1; 

    const newUser = { 
        id: newUserId,
        name: name, 
        email: email, 
        password: password,
        isAdmin: false,      
        purchases: []         
    };

    Users.push(newUser);
    localStorage.setItem('users', JSON.stringify(Users))
    alert('Registro Exitoso!')
    window.location.href = 'login.html'
});