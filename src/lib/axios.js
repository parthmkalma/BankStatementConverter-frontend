// lib/axios.js
import axios from "axios";

// Optional: change defaults globally
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
axios.defaults.withCredentials = true;

export default axios; // exports the default instance
