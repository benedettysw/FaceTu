const firebaseConfig = {
  authDomain: "me-gusta-c1af1.firebaseapp.com",    // Notar el -c1af1
  databaseURL: "https://me-gusta-c1af1-default-rtdb.firebaseio.com", // Notar el -c1af1
  projectId: "me-gusta-c1af1",    // Notar el -c1af1
  storageBucket: "me-gusta-c1af1.appspot.com"    // Notar el -c1af1
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();






// Función para actualizar los contadores en la página
function actualizarContadores(likesData) {
  document.querySelectorAll('.likes-count').forEach(contador => {
      const persona = contador.dataset.count;
      const likes = likesData[persona] || 0;
      contador.textContent = `${likes} Me gusta`;
  });
}

// Escuchar cambios en tiempo real
database.ref('likes').on('value', (snapshot) => {
  const likesData = snapshot.val() || {};
  actualizarContadores(likesData);
});

