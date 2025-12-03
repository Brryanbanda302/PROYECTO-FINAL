document.addEventListener('DOMContentLoaded', () => {
    
    const USER_KEY = 'users'; 
    const ACTIVE_USER_KEY = 'activeUserEmail';
    const CATALOG_KEY = 'productCatalog';
    const defaultImagePath = "img/disco.png"; 

    // --- DATOS PREDETERMINADOS (MOVIDOS AQUÍ) ---

    const additionalArtists = [
        "The Vinyl Souls", "Synthwave Collective", "Midnight Echo", "Jazz Quorum", 
        "Crono", "Nebula Drive", "Acoustic Fire", "Silver Road", "The Time Travellers",
        "Lírica Urbana", "Pulse Code", "Electro Heart", "The Fading Lights", 
        "Deep Tide", "Vox Machina", "Ember", "Ghost Writer", "Silent Parade",
        "Astral Glow", "Sunset Waves", "Urban Rhythm", "The New World"
    ];

    const specificAlbumNames = [
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

    const genericTitles = [
        "EL ECO PERDIDO", "SINFONÍA ESTELAR", "RITMOS DE MEDIANOCHE", "LA COSECHA DEL ALMA", 
        "SUEÑOS DE VINILO", "TRONO DE CRISTAL", "VIAJE TEMPORAL", "LUZ EN LA NIEBLA", 
        "MÁQUINA DEL TIEMPO", "LATIDOS DE CIUDAD", "CAMINOS DE SEDA", "LA LEYENDA DEL SOL", 
        "OCÉANO DE SONIDOS", "FANTASMAS DEL AYER", "EL JARDÍN SECRETO", "FUEGO LENTO",
        "EL ÚLTIMO VALS", "ESPEJOS ROTOS", "CIELO CARMESÍ", "ECOS DE JAZZ", 
        "FRONTERA SILENCIOSA", "RELÁMPAGO AZUL", "DANZA CÓSMICA", "EL MAESTRO DE MARIONETAS", 
        "SOMBRAS Y VIENTO", "AMANECER BOREAL", "GEOMETRÍA LUNAR" 
    ];
    
    function initializeDefaultCatalog() {

        let discos = JSON.parse(localStorage.getItem(CATALOG_KEY));
        if (discos && discos.length > 0) {
            return discos;
        }

        discos = [];
        for (let i = 0; i < 50; i++) {
            const price = (15 + Math.random() * 25).toFixed(2);
            
            let nombreCompleto;
            let artistaNombre;

            if (i < specificAlbumNames.length) {
                nombreCompleto = specificAlbumNames[i];
                
                const parts = nombreCompleto.split(' - ');
                if (parts.length > 1) {
                    artistaNombre = parts[0].trim();
                } else {
                    artistaNombre = "Varios Artistas";
                }
            } else {
                const genericIndex = i - specificAlbumNames.length;
                
                artistaNombre = additionalArtists[genericIndex % additionalArtists.length];
                
                nombreCompleto = `${artistaNombre} - ${genericTitles[genericIndex % genericTitles.length]}`;
            }

            discos.push({
                id: i + 1,
                nombre: nombreCompleto,
                artista: artistaNombre, 
                precio: parseFloat(price),
                imagen: defaultImagePath 
            });
        }
        
        localStorage.setItem(CATALOG_KEY, JSON.stringify(discos));
        console.log("Catálogo predeterminado inicializado para la tienda.");
        return discos;
    }
    
    const discos = initializeDefaultCatalog();

   
    function getProductCatalog() {

        return discos; 
    }

    function isProductAlreadyPurchased(productName, productArtist, userPurchases) {
        return userPurchases.some(purchase => 
            purchase.name === productName && purchase.artist === productArtist
        );
    }
    
    function checkPurchaseStatus(currentUser) {

        const discos = getProductCatalog();
        if (!currentUser || !currentUser.purchases) return;

        const buyButtons = document.querySelectorAll('.buy-btn');
        const userPurchases = currentUser.purchases;

        buyButtons.forEach(button => {
            const discoId = parseInt(button.getAttribute('data-disco-id'));
            const disco = discos.find(d => d.id === discoId);

          
            if (currentUser.isAdmin) {
                button.disabled = true;
                button.textContent = 'Solo Ver';
                button.classList.remove('btn-primary');
                button.classList.add('btn-warning');
            } 
            
            else if (disco && isProductAlreadyPurchased(disco.nombre, disco.artista, userPurchases)) {
                button.disabled = true;
                button.textContent = 'Comprado';
                button.classList.remove('btn-primary');
                button.classList.add('btn-secondary');
            }
        });
    }

   

    const catalogoContainer = document.getElementById('catalogo-discos');

    function renderCatalogo() {
        if (!catalogoContainer) return;

   
        const discos = getProductCatalog();
        
        if (discos.length === 0) {
            catalogoContainer.innerHTML = '<p class="text-center p-5">No hay discos disponibles en el catálogo.</p>';
            return;
        }

        let htmlContent = '';
        discos.forEach(disco => {
            htmlContent += `
                <div class="col">
                    <div class="card h-100 shadow-sm">
                        <img src="${disco.imagen || 'img/disco.png'}" class="card-img-top" alt="${disco.nombre}">
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
        catalogoContainer.innerHTML = htmlContent;
    }
    
  
    catalogoContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('buy-btn')) {
            const discos = getProductCatalog();
            const discoId = parseInt(e.target.getAttribute('data-disco-id'));
            const discoComprado = discos.find(d => d.id === discoId);

            const currentUserEmail = localStorage.getItem(ACTIVE_USER_KEY);
            if (!currentUserEmail) {
                alert("Debes iniciar sesión para realizar una compra.");
                window.location.href = 'login.html';
                return;
            }

            let allUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];
            const userIndex = allUsers.findIndex(user => user.email === currentUserEmail);

            if (userIndex === -1) {
                alert("Error: Usuario activo no encontrado. Intenta iniciar sesión de nuevo.");
                localStorage.removeItem(ACTIVE_USER_KEY);
                return;
            }
            
            const currentUser = allUsers[userIndex];
            
      
            if (currentUser.isAdmin) {
                alert("🚫 Los administradores no pueden realizar compras en la tienda.");
                return; 
            }
            
            if (!currentUser.purchases) {
                currentUser.purchases = [];
            }

            if (isProductAlreadyPurchased(discoComprado.nombre, discoComprado.artista, currentUser.purchases)) {
                alert(`¡Atención! Ya has comprado "${discoComprado.nombre}".`);
                return; 
            }

            const nuevaCompra = {
                id: discoComprado.id,
                name: discoComprado.nombre,
                artist: discoComprado.artista,
                price: discoComprado.precio,
                image: discoComprado.imagen, 
                date: new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', month: 'short', day: 'numeric' 
                })
            };

            currentUser.purchases.push(nuevaCompra);

            allUsers[userIndex] = currentUser;
            localStorage.setItem(USER_KEY, JSON.stringify(allUsers));
            
            alert(`¡Compra exitosa! Has comprado "${discoComprado.nombre}" por $${discoComprado.precio.toFixed(2)}.`);
            
            e.target.disabled = true;
            e.target.textContent = 'Comprado';
            e.target.classList.remove('btn-primary');
            e.target.classList.add('btn-secondary');
        }
    });

    const perfilLink = document.getElementById('perfilLink');
    if (perfilLink) {
        perfilLink.addEventListener('click', (e) => {
            e.preventDefault();

            const activeUserEmail = localStorage.getItem(ACTIVE_USER_KEY);
            
            if (!activeUserEmail) {
                alert('Debes iniciar sesión para acceder a tu perfil.');
                window.location.href = 'login.html';
                return;
            }

            const allUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];
            const currentUser = allUsers.find(user => user.email === activeUserEmail);

            if (currentUser) {
                if (currentUser.isAdmin) {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'user.html';
                }
            } else {
                alert('Error al cargar datos de perfil. Intenta iniciar sesión de nuevo.');
                localStorage.removeItem(ACTIVE_USER_KEY);
                window.location.href = 'login.html';
            }
        });
    }

    renderCatalogo();

    const activeUserEmail = localStorage.getItem(ACTIVE_USER_KEY);
    if (activeUserEmail) {
        const allUsers = JSON.parse(localStorage.getItem(USER_KEY)) || [];
        const currentUser = allUsers.find(user => user.email === activeUserEmail);
        checkPurchaseStatus(currentUser);
    }
});