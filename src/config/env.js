const RAW_BACKEND = import.meta.env.VITE_BACKEND_URL;

export const BACKEND_URL = RAW_BACKEND 
  ? RAW_BACKEND.replace(/\/$/, '') 
  : 'http://localhost:5000';