import axios from 'axios';

// When running with Vite dev server proxy or same origin, relative path `/api` avoids any CORS restrictions.
// If VITE_API_URL is explicitly defined (e.g., in production or separate domain), use it.
const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');
const baseURL = rawApiUrl ? `${rawApiUrl}/api` : '/api';

const api = axios.create({
    baseURL
});

export default api;

