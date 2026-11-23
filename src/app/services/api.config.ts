// Dirección del backend:
// - Si la app corre en tu computador (ng serve), usa el backend local.
// - Si corre publicada (Railway o GitHub Pages), usa el backend publicado en Railway.
export const API_URL =
  location.hostname === 'localhost'
    ? 'http://localhost:3000/api/v1'
    : 'https://senderosapp-backend-production.up.railway.app/api/v1';
