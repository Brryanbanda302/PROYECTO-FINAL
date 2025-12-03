document.addEventListener('DOMContentLoaded', () => {
    
    const userKey = 'activeUserEmail'; 
    const USER_KEY = 'users'; 
    
    let currentUserEmail = localStorage.getItem(userKey);
    
    if (!currentUserEmail) {
        alert("Debes iniciar sesión para acceder a esta página.");
        window.location.href = 'login.html';
        return;
    }
    
    let allUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];
    let currentUser = allUsers.find(user => user.email === currentUserEmail);

    if (!currentUser) {
        alert("Error: Usuario activo no encontrado. Redirigiendo a login.");
        localStorage.removeItem(userKey);
        window.location.href = 'login.html';
        return;
    }

    function saveUsers() {
        const userIndex = allUsers.findIndex(user => user.email === currentUser.email);

        if (userIndex !== -1) {
            allUsers[userIndex] = currentUser;
            localStorage.setItem(USER_KEY, JSON.stringify(allUsers));
        } else {
            console.error("Error al guardar: Usuario no encontrado en el array global.");
        }
    }

    function updateProfileDisplay() {
        const profileName = document.getElementById('profile-name');
        const profileEmail = document.getElementById('profile-email');

        if (profileName) profileName.textContent = currentUser.name;
        if (profileEmail) profileEmail.textContent = currentUser.email;
    }

    function loadPurchaseHistory() {
        const historyList = document.getElementById('purchaseHistoryList');
        if (!historyList) return; 

        const purchases = currentUser.purchases || []; 
        
        if (purchases.length === 0) {
            historyList.innerHTML = `<p class="text-muted">Aún no tienes compras registradas.</p>`;
            return;
        }

        let html = '<ul class="list-group">'; 
        
        purchases.forEach((item, idx) => {
            html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                        ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 15px; border-radius: 5px; object-fit: cover;">` : ''}

                        <div class="flex-grow-1">
                            <strong>${item.name}</strong> - ${item.artist}
                            <br><small class="text-muted">Comprado el: ${item.date}</small>
                        </div>
                        
                        <span class="badge bg-primary rounded-pill me-2">$${item.price.toFixed(2)}</span>
                        
                        <button class="btn btn-danger btn-sm delete-purchase-btn" data-index="${idx}" aria-label="Eliminar compra">
                            <i class="bi bi-trash"></i> 
                        </button>
                     </li>`;
        });
        
        html += '</ul>';
        historyList.innerHTML = html;
        attachDeleteEventListeners(); 
    }

    function deletePurchase(index) {
        if (!confirm("¿Estás seguro de que quieres eliminar este producto del historial de compras?")) {
            return;
        }

        currentUser.purchases.splice(index, 1);
        
        saveUsers();
        loadPurchaseHistory();
        
        alert("Producto eliminado del historial.");
    }

    function attachDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll('.delete-purchase-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToDelete = parseInt(e.currentTarget.getAttribute('data-index'));
                deletePurchase(indexToDelete);
            });
        });
    }

    const editButtons = document.querySelectorAll('.edit-btn');
    const formContainers = document.querySelectorAll('.edit-form-container');

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);

            formContainers.forEach(container => {
                if (container.id !== targetElement.id) {
                    container.classList.add('hidden');
                }
            });

            if (targetElement) {
                 targetElement.classList.toggle('hidden');
            }
        });
    });

    const formEditName = document.getElementById('form-edit-name');
    if (formEditName) {
        formEditName.addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = document.getElementById('newName').value;
            
            if (newName === currentUser.name) {
                alert("El nuevo nombre es el mismo que el actual.");
                return;
            }

            currentUser.name = newName; 
            saveUsers(); 
            updateProfileDisplay();
            alert("Nombre actualizado con éxito.");
            formEditName.reset();
        });
    }

    const formEditEmail = document.getElementById('form-edit-email');
    if (formEditEmail) {
        formEditEmail.addEventListener('submit', (e) => {
            e.preventDefault();
            const newEmail = document.getElementById('newEmail').value;
            const passwordConfirm = document.getElementById('emailPasswordConfirm').value;

            if (passwordConfirm !== currentUser.password) {
                alert("Contraseña actual incorrecta.");
                return;
            }
            
            if (newEmail === currentUser.email) {
                alert("El nuevo correo es el mismo que el actual.");
                return;
            }

            const emailExists = allUsers.some(user => user.email === newEmail && user.email !== currentUserEmail);
            if (emailExists) {
                alert("Este correo ya está registrado por otra cuenta.");
                return;
            }

            currentUser.email = newEmail;
            localStorage.setItem(userKey, newEmail); 
            currentUserEmail = newEmail; 
            
            saveUsers();
            updateProfileDisplay();
            alert("Correo actualizado con éxito. Usa el nuevo correo para iniciar sesión.");
            formEditEmail.reset();
        });
    }

    const formEditPassword = document.getElementById('form-edit-password');
    if (formEditPassword) {
        formEditPassword.addEventListener('submit', (e) => {
            e.preventDefault();
            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;

            if (oldPassword !== currentUser.password) {
                alert("La contraseña anterior es incorrecta.");
                return;
            }
            
            if (oldPassword === newPassword) {
                alert("La nueva contraseña debe ser diferente a la anterior.");
                return;
            }

            currentUser.password = newPassword;
            saveUsers(); 
            alert("Contraseña cambiada con éxito.");
            formEditPassword.reset();
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem(userKey);
            alert("Sesión cerrada. Serás redirigido al inicio de sesión.");
            window.location.href = 'login.html';
        });
    }

    updateProfileDisplay();
    loadPurchaseHistory();
});