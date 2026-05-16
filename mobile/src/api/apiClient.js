// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/api/apiClient.js
// FOLDER: mobile → src → api
// PURPOSE: Axios instance — auto-attaches Firebase auth token
//          to every request so backend can verify the caller
// ═══════════════════════════════════════════════════════════

import axios from 'axios';
import auth from '@react-native-firebase/auth';

// Base URL — 10.0.2.2 maps to localhost on Android emulator
// Change to your machine's LAN IP (e.g. 192.168.x.x) for a real device
const BASE_URL = 'http://10.0.2.2:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15 second timeout
  headers: { 'Content-Type': 'application/json' },
});

// ── Request Interceptor ──────────────────────
// Automatically adds "Authorization: Bearer <token>" before every request
api.interceptors.request.use(
  async (config) => {
    try {
      const user = auth().currentUser;
      if (user) {
        // forceRefresh=false uses cached token (refreshes only when expired)
        const token = await user.getIdToken(false);
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Could not attach auth token:', error.message);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ─────────────────────
// Normalize errors so every caller gets a consistent shape
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

export default api;