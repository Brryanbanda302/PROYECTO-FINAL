document.addEventListener('DOMContentLoaded', () => {
    const llaveUsuario = 'users'; 
    const USER_KEY = 'userActivo';
    const llaveCat = 'productCatalog';
    const defaultImagePath = "img/disco.png"; 

    const artistasAdicionales = [
        "The Vinyl Souls", "Synthwave Collective", "Midnight Echo", "Jazz Quorum", 
        "Crono", "Nebula Drive", "Acoustic Fire", "Silver Road", "The Time Travellers",
        "Lírica Urbana", "Pulse Code", "Electro Heart", "The Fading Lights", 
        "Deep Tide", "Vox Machina", "Ember", "Ghost Writer", "Silent Parade",
        "Astral Glow", "Sunset Waves", "Urban Rhythm", "The New World"
    ];

    const albumNombres = [
        "ÁLVARO SOLER - SOFIA", "BESOS, LIMÓN Y MIEL - MARIANA SEOANE FT. JOSÉ EDUARDO",
        "COINCIDIR - MACACO", "QUERERTE", "ME ENCANTAS DEMASIADO", "SONREÍR - KURT",
        "NICOLÁS MAYORCA - POR TI", "ZERI - ASÍ TE PEDÍ", "RSEL - SIN PEDIRME PERDÓN",
        "DUELES - JESSE Y JOY", "TODO DE TI - RAUW ALEJANDRO", "LIVIN' LA VIDA LOCA - RICKY MARTIN",
        "MATISSE, GUAYNAA - IMPOSIBLE AMOR", "PERRO DE CADENA GRUESA",
        "ANDRÉS CEPEDA, CALI Y EL DANDEE - TE VOY A AMAR", "TAL VEZ, HE CAMBIADO TANTO...",
        "IMAGINE DRAGONS - ÁLBUM ORIGEN (DELUXE)", "ANTHRÉS - EL DIABLO USA FALDA",
        "FLOR DE LOTO - RABELAY FEAT.", "DAAZ, SABINO - MOTEL CALIFORNIA",
        "PUNTO DE QUIEBRE - D’HUIZAR", "SANTA RM - DEJA VU",
        "30 DE FEBRERO - HA-ASH FT. ABRAHAM MATEO"
    ];

    const titulosGenericos = [
        "EL ECO PERDIDO", "SINFONÍA ESTELAR", "RITMOS DE MEDIANOCHE", "LA COSECHA DEL ALMA", 
        "SUEÑOS DE VINILO", "TRONO DE CRISTAL", "VIAJE TEMPORAL", "LUZ EN LA NIEBLA", 
        "MÁQUINA DEL TIEMPO", "LATIDOS DE CIUDAD", "CAMINOS DE SEDA", "LA LEYENDA DEL SOL", 
        "OCÉANO DE SONIDOS", "FANTASMAS DEL AYER", "EL JARDÍN SECRETO", "FUEGO LENTO",
        "EL ÚLTIMO VALS", "ESPEJOS ROTOS", "CIELO CARMESÍ", "ECOS DE JAZZ", 
        "FRONTERA SILENCIOSA", "RELÁMPAGO AZUL", "DANZA CÓSMICA", "EL MAESTRO DE MARIONETAS", 
        "SOMBRAS Y VIENTO", "AMANECER BOREAL", "GEOMETRÍA LUNAR" 
    ];

    function initializeDefaultCatalog() {
        let discos = JSON.parse(localStorage.getItem(llaveCat));
        if (discos && discos.length > 0) return discos;

        discos = [];
        for (let i = 0; i < 50; i++) {
            const precio = (15 + Math.random() * 25).toFixed(2);
            let nombreCompleto;
            let artistaNombre;

            if (i < albumNombres.length) {
                nombreCompleto = albumNombres[i];
                const parts = nombreCompleto.split(' - ');
                artistaNombre = parts.length > 1 ? parts[0].trim() : "Varios Artistas";
            } else {
                const genericIndex = i - albumNombres.length;
                artistaNombre = artistasAdicionales[genericIndex % artistasAdicionales.length];
                nombreCompleto = `${artistaNombre} - ${titulosGenericos[genericIndex % titulosGenericos.length]}`;
            }

            discos.push({
                id: i + 1,
                nombre: nombreCompleto,
                artista: artistaNombre, 
                precio: parseFloat(precio),
                imagen: defaultImagePath 
            });
        }
        
        localStorage.setItem(llaveCat, JSON.stringify(discos));
        return discos;
    }
    
    const discos = initializeDefaultCatalog();

    function getProductCatalog() {
        return discos; 
    }

    function retornarProductosDatos(productName, productArtist, userPurchases) {
        return userPurchases.some(purchase => purchase.name === productName && purchase.artist === productArtist);
    }
    
    function VerificacionDeInicion(verificarSesion) {
        const discos = getProductCatalog();
        if (!verificarSesion || !verificarSesion.purchases) return;

        const compra = document.querySelectorAll('.buy-btn');
        const userPurchases = verificarSesion.purchases;

        compra.forEach(button => {
            const discoId = parseInt(button.getAttribute('data-disco-id'));
            const disco = discos.find(d => d.id === discoId);

            if (verificarSesion.isAdmin) {
                button.disabled = true;
                button.textContent = 'Solo Ver';
                button.classList.remove('btn-primary');
                button.classList.add('btn-warning');
            } else if (disco && retornarProductosDatos(disco.nombre, disco.artista, userPurchases)) {
                button.disabled = true;
                button.textContent = 'Comprado';
                button.classList.remove('btn-primary');
                button.classList.add('btn-secondary');
            }
        });
    }

    const contenedorCatalago = document.getElementById('catalogo-discos');

    function mostrarCatalago() {
        if (!contenedorCatalago) return;

        const discos = getProductCatalog();
        
        if (discos.length === 0) {
            contenedorCatalago.innerHTML = '<p class="text-center p-5">No hay discos disponibles en el catálogo.</p>';
            return;
        }

        let htmlContent = '';
        discos.forEach(disco => {
            htmlContent += `
                <div class="col">
                    <div class="card h-100 shadow-sm">
                        <img src="${disco.imagen || defaultImagePath}" class="card-img-top" alt="${disco.nombre}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${disco.nombre}</h5>
                            <p class="card-text">${disco.artista}</p>
                            <div class="card-footer mt-auto">
                                <span class="badge bg-success">$${disco.precio ? disco.precio.toFixed(2) : '0.00'}</span>
                                <button class="btn btn-primary buy-btn" data-disco-id="${disco.id}">Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        contenedorCatalago.innerHTML = htmlContent;
    }
    
    contenedorCatalago.addEventListener('click', (e) => {
        if (!e.target.classList.contains('buy-btn')) return;

        const discos = getProductCatalog();
        const discoId = parseInt(e.target.getAttribute('data-disco-id'));
        const discoComprado = discos.find(d => d.id === discoId);

        const usuarioEmail = localStorage.getItem(USER_KEY);
        if (!usuarioEmail) {
            alert("Debes iniciar sesión para realizar una compra.");
            window.location.href = 'login.html';
            return;
        }

        let usuariosEdicion = JSON.parse(localStorage.getItem(llaveUsuario)) || [];
        const userIndex = usuariosEdicion.findIndex(user => user.email === usuarioEmail);

        if (userIndex === -1) {
            alert("Error: Usuario activo no encontrado. Intenta iniciar sesión de nuevo.");
            localStorage.removeItem(USER_KEY);
            return;
        }
        
        const verificarSesion = usuariosEdicion[userIndex];
        
        if (verificarSesion.isAdmin) {
            alert("🚫 Los administradores no pueden realizar compras en la tienda.");
            return; 
        }
        
        if (!verificarSesion.purchases) verificarSesion.purchases = [];

        if (retornarProductosDatos(discoComprado.nombre, discoComprado.artista, verificarSesion.purchases)) {
            alert(`¡Atención! Ya has comprado "${discoComprado.nombre}".`);
            return; 
        }

        const nuevaCompra = {
            id: discoComprado.id,
            name: discoComprado.nombre,
            artist: discoComprado.artista,
            precio: discoComprado.precio,
            image: discoComprado.imagen, 
            date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
        };

        verificarSesion.purchases.push(nuevaCompra);
        usuariosEdicion[userIndex] = verificarSesion;
        localStorage.setItem(llaveUsuario, JSON.stringify(usuariosEdicion));
        
        alert(`¡Compra exitosa! Has comprado "${discoComprado.nombre}" por $${discoComprado.precio.toFixed(2)}.`);
        
        e.target.disabled = true;
        e.target.textContent = 'Comprado';
        e.target.classList.remove('btn-primary');
        e.target.classList.add('btn-secondary');
    });

    const perfilLink = document.getElementById('perfilLink');
    if (perfilLink) {
        perfilLink.addEventListener('click', (e) => {
            e.preventDefault();

            const usuarioEmail = localStorage.getItem(USER_KEY);
            if (!usuarioEmail) {
                alert('Debes iniciar sesión para acceder a tu perfil.');
                window.location.href = 'login.html';
                return;
            }

            const usuariosEdicion = JSON.parse(localStorage.getItem(llaveUsuario)) || [];
            const verificarSesion = usuariosEdicion.find(user => user.email === usuarioEmail);

            if (verificarSesion) {
                window.location.href = verificarSesion.isAdmin ? 'admin.html' : 'user.html';
            } else {
                alert('Error al cargar datos de perfil. Intenta iniciar sesión de nuevo.');
                localStorage.removeItem(USER_KEY);
                window.location.href = 'login.html';
            }
        });
    }

    mostrarCatalago();

    const usuarioEmail = localStorage.getItem(USER_KEY);
    if (usuarioEmail) {
        const usuariosEdicion = JSON.parse(localStorage.getItem(llaveUsuario)) || [];
        const verificarSesion = usuariosEdicion.find(user => user.email === usuarioEmail);
        VerificacionDeInicion(verificarSesion);
    }
});
