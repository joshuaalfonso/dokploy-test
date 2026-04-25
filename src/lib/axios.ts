import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptor (e.g. auth token)
api.interceptors.request.use((config) => {

    const stored = localStorage.getItem("auth-storage");

    
    if (stored) {

        try {
            const { state } = JSON.parse(stored);

            const token = state?.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

        } 

        catch (err) {
            console.error("Failed to parse auth-storage:", err);
        }

    }

  return config;


//   const token = localStorage.getItem("auth-storage");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
});

export default api;