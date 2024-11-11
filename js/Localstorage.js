function closeMenu() {
    document.getElementById('burger').checked = false;
}


// Función principal para los botones de like
document.querySelectorAll('.botonLike').forEach(button => {
    button.addEventListener('click', async function(e) {
        const personaId = this.dataset.persona;
        try {
            const likesRef = firebase.database().ref('likes/' + personaId);
            
            // Usamos transaction para asegurar que la actualización sea atómica
            likesRef.transaction((currentLikes) => {
                return (currentLikes || 0) + 1; // Si no existe, asigna 0 y luego le suma 1
            });

            // Guardamos el "me gusta" en localStorage
            guardarLike(personaId);

            // Desactivar botón y dar feedback visual
            desactivarBotones();
            this.classList.add('liked');
            
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    });
});



// Las funciones auxiliares permanecen igual ya que no usan Firebase
function yaDigisteLike() {
    console.log("hola ya duste like");
    return localStorage.getItem('hasDadoLike') === 'true';
}

function guardarLike(personaId) {
    localStorage.setItem('hasDadoLike', 'true');
    localStorage.setItem('personaLiked', personaId);
}

function desactivarBotones() {
    const botones = document.querySelectorAll('.botonLike');
    botones.forEach(boton => {
        boton.disabled = true;
        boton.classList.add('disabled');
    });
}

// Actualización del segundo event listener
document.querySelectorAll('.botonLike').forEach(button => {
    button.addEventListener('click', async function(e) {
        if (yaDigisteLike()) {
            e.preventDefault();
            return;
        }
        const personaId = this.dataset.persona;
        try {
            const likesRef = ref(database, `likes/${personaId}`);
            const snapshot = await get(likesRef);
            const likesActuales = snapshot.val() || 0;
            await set(likesRef, likesActuales + 1);
            guardarLike(personaId);
            desactivarBotones();
            this.classList.add('liked');
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    });
});

// El event listener de DOMContentLoaded permanece igual
document.addEventListener('DOMContentLoaded', () => {
    if (yaDigisteLike()) {
        desactivarBotones();
        const personaLiked = localStorage.getItem('personaLiked');
        if (personaLiked) {
            const botonLiked = document.querySelector(`[data-persona="${personaLiked}"]`);
            if (botonLiked) {
                botonLiked.classList.add('liked');
            }
        }
    }
});







document.querySelectorAll('.botonLike').forEach(button => {
    button.addEventListener('click', async function (e) {
        alertify.success('Gracias por tu me gusta ❤️🥵');

        
    });
});