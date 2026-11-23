// Dirección del backend:
// - Si la app corre en tu computador (ng serve), usa el backend local.
// - Si corre publicada (GitHub Pages), usa el backend publicado en Render.
export const API_URL =
  location.hostname === 'localhost'
    ? 'http://localhost:3000/api/v1'
    : 'https://senderosapp-backend.onrender.com/api/v1';
