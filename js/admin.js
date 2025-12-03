document.addEventListener('DOMContentLoaded', () => {
    
    const llaveUsuario = 'users'; 
    const userActivo = 'userActivo';
    const llaveCat = 'productCatalog';

    (function defultAdmin() {
        let adminDefecto = JSON.parse(localStorage.getItem(llaveUsuario)) || [];
        const defaultAdmin = {
            id: 1,
            name: "Admin",
            email: "admin@vinilos.com",
            password: "admin123",
            isAdmin: true,
            purchases: []
        };
        const adminExistente = adminDefecto.some(user => user.email === defaultAdmin.email);
        if (!adminExistente) {
            adminDefecto.push(defaultAdmin);
            localStorage.setItem(llaveUsuario, JSON.stringify(adminDefecto));
            console.log("Administrador por defecto añadido.");
        }
    })();

    const verificarSesionEmail = localStorage.getItem(userActivo);
    let usuariosEdicion = JSON.parse(localStorage.getItem(llaveUsuario)) || [];
    const verificarSesion = usuariosEdicion.find(user => user.email === verificarSesionEmail);

    if (!verificarSesionEmail || !verificarSesion) {
        alert("No hay sesión activa o el usuario no existe. Serás redirigido al inicio de sesión.");
        localStorage.removeItem(userActivo);
        window.location.href = 'login.html';
        return;
    }

    if (!verificarSesion.isAdmin) {
        alert("Acceso denegado. Serás redirigido al inicio de sesión.");
        localStorage.removeItem(userActivo);
        window.location.href = 'login.html';
        return;
    }

    function GuardarUsuario() {
        const userIndex = usuariosEdicion.findIndex(user => user.email === verificarSesion.email);
        if (userIndex !== -1) {
            usuariosEdicion[userIndex] = verificarSesion;
            localStorage.setItem(llaveUsuario, JSON.stringify(usuariosEdicion));
        }
    }

    function edicionUsuarioG() {
        localStorage.setItem(llaveUsuario, JSON.stringify(usuariosEdicion));
    }

    function renderidMuestraPanel() {
        const mostrarNombreAd = document.getElementById('admin-name');
        const mostrarCorreoAd = document.getElementById('admin-email');
        if (mostrarNombreAd) mostrarNombreAd.textContent = verificarSesion.name;
        if (mostrarCorreoAd) mostrarCorreoAd.textContent = verificarSesion.email;
    }

    const navButtons = document.querySelectorAll('.list-group-item-action');
    const contentSections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const idMuestraD = e.target.getAttribute('data-section');
            navButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            contentSections.forEach(section => {
                if (section.id === idMuestraD) {
                    section.classList.remove('hidden');
                    section.style.display = 'block';
                } else {
                    section.classList.add('hidden');
                    section.style.display = 'none';
                }
            });
            if (idMuestraD === 'product-management') {
                cargarProductos();
            } else if (idMuestraD === 'admin-management') {
                mostrarAdmins();
            }
        });
    });

    const seccionDef = document.getElementById('idMuestraPanel');
    if (seccionDef) {
        seccionDef.style.display = 'block';
        seccionDef.classList.remove('hidden');
        const defaultNavButton = document.querySelector('.list-group-item-action[data-section="idMuestraPanel"]');
        if (defaultNavButton) defaultNavButton.classList.add('active');
    }

    const editFormContainers = document.querySelectorAll('.edit-form-container');
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            editFormContainers.forEach(container => {
                if (container.id !== targetId.substring(1)) {
                    container.classList.add('hidden');
                }
            });
            document.querySelector(targetId).classList.toggle('hidden');
        });
    });

    document.getElementById('admin-name-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('newAdminName').value;
        if (newName) {
            verificarSesion.name = newName;
            GuardarUsuario();
            renderidMuestraPanel();
            alert("Nombre actualizado con éxito.");
            document.getElementById('form-edit-admin-name').classList.add('hidden');
        }
    });

    document.getElementById('admin-password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const oldPassword = document.getElementById('oldAdminPassword').value;
        const newPassword = document.getElementById('newAdminPassword').value;
        if (oldPassword !== verificarSesion.password) {
            alert("Contraseña anterior incorrecta.");
            return;
        }
        if (oldPassword === newPassword) {
            alert("La nueva contraseña debe ser diferente.");
            return;
        }
        verificarSesion.password = newPassword;
        GuardarUsuario();
        alert("Contraseña cambiada con éxito.");
        document.getElementById('admin-password-form').reset();
        document.getElementById('form-edit-admin-password').classList.add('hidden');
    });

    function cargarProductos() {
        const listaProductos = document.getElementById('listaProductos');
        let productos = JSON.parse(localStorage.getItem(llaveCat)) || [];
        if (productos.length === 0) {
            listaProductos.innerHTML = `<p class="text-muted p-2">No hay productos en el catálogo.</p>`;
            return;
        }
        let html = '';
        productos.forEach(p => {
            html += `<li class="list-group-item list-group-item-product">
                        <div>
                            <strong>${p.nombre}</strong> <span class="text-muted">(${p.artista})</span>
                            <br><small>$${p.precio.toFixed(2)}</small>
                        </div>
                        <button class="btn btn-danger btn-sm delete-product-btn" data-id="${p.id}" aria-label="Eliminar producto">
                            <i class="bi bi-trash"></i>
                        </button>
                    </li>`;
        });
        listaProductos.innerHTML = html;
        escuhadorEliminarProd();
    }

    function agragarProd(name, artist, precio) {
        let productos = JSON.parse(localStorage.getItem(llaveCat)) || [];
        const nuevoIdProd = productos.length > 0 ? Math.max(...productos.map(p => p.id || 0)) + 1 : 1; 
        const nuevoProducto = {
            id: nuevoIdProd,
            nombre: name,
            artista: artist,
            precio: parseFloat(precio),
            imagen: "img/disco.png" 
        };
        productos.push(nuevoProducto);
        localStorage.setItem(llaveCat, JSON.stringify(productos));
        cargarProductos();
        alert(`Producto "${name}" añadido.`);
    }

    function eliminarProd(id) {
        if (!confirm("¿Está seguro de que desea eliminar este producto del catálogo?")) return;
        let productos = JSON.parse(localStorage.getItem(llaveCat)) || [];
        productos = productos.filter(p => p.id !== id);
        localStorage.setItem(llaveCat, JSON.stringify(productos));
        cargarProductos();
        alert("Producto eliminado del catálogo.");
    }

    function escuhadorEliminarProd() {
        document.querySelectorAll('.delete-product-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const idToDelete = parseInt(e.currentTarget.getAttribute('data-id'));
                eliminarProd(idToDelete);
            });
        });
    }

    document.getElementById('agregarProdForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const artist = document.getElementById('productArtist').value;
        const precio = document.getElementById('productprecio').value;
        if (name && artist && !isNaN(precio) && parseFloat(precio) > 0) {
            agragarProd(name, artist, precio);
            document.getElementById('agregarProdForm').reset();
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    });
    
    function mostrarAdmins() {
        const adminLista = document.getElementById('adminLista');
        const admins = usuariosEdicion.filter(user => user.isAdmin);
        if (admins.length === 0) {
            adminLista.innerHTML = `<p class="text-danger p-2">¡ATENCIÓN! No hay administradores activos.</p>`;
            return;
        }
        let html = '';
        admins.forEach(a => {
            const verificarSesion = a.email === verificarSesionEmail;
            html += `<li class="list-group-item list-group-item-product ${verificarSesion ? 'list-group-item-warning' : ''}">
                        <div>
                            <strong>${a.name}</strong> 
                            <span class="text-muted">(${a.email})</span>
                            ${verificarSesion ? ' <span class="badge bg-dark">Tú</span>' : ''}
                        </div>
                        <button class="btn btn-danger btn-sm delete-admin-btn" data-email="${a.email}" ${verificarSesion ? 'disabled' : ''} aria-label="Eliminar administrador">
                            <i class="bi bi-person-slash"></i>
                        </button>
                    </li>`;
        });
        adminLista.innerHTML = html;
        escuchadorDeborraradmin();
    }

    function agregarAdmin(name, email, password) {
        const emailExists = usuariosEdicion.some(user => user.email === email);
        if (emailExists) {
            alert("Este correo ya está registrado como usuario o administrador.");
            return;
        }
        const nuevoIdProd = usuariosEdicion.length > 0 ? Math.max(...usuariosEdicion.map(u => u.id || 0)) + 1 : 1; 
        const newAdmin = {
            id: nuevoIdProd,
            name: name,
            email: email,
            password: password,
            isAdmin: true,
            purchases: []
        };
        usuariosEdicion.push(newAdmin);
        edicionUsuarioG();
        mostrarAdmins();
        alert(`Administrador "${name}" añadido.`);
    }

    function borrarAdmin(email) {
        if (email === verificarSesionEmail) {
            alert("No puedes eliminar tu propia cuenta de administrador.");
            return;
        }
        if (!confirm(`¿Está seguro de que desea eliminar al administrador con correo: ${email}?`)) return;
        usuariosEdicion = usuariosEdicion.filter(user => user.email !== email);
        edicionUsuarioG();
        mostrarAdmins();
        alert("Administrador eliminado.");
    }

    function escuchadorDeborraradmin() {
        document.querySelectorAll('.delete-admin-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const emailToDelete = e.currentTarget.getAttribute('data-email');
                borrarAdmin(emailToDelete);
            });
        });
    }

    document.getElementById('add-admin-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('adminNewName').value;
        const email = document.getElementById('adminNewEmail').value;
        const password = document.getElementById('adminNewPassword').value;
        if (name && email && password) {
            agregarAdmin(name, email, password);
            document.getElementById('add-admin-form').reset();
        } else {
            alert("Por favor, complete todos los campos para el nuevo administrador.");
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem(userActivo);
        alert("Sesión cerrada. Serás redirigido al inicio de sesión.");
        window.location.href = 'login.html';
    });

    renderidMuestraPanel();
    cargarProductos(); 
    mostrarAdmins(); 
});
