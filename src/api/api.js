import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // backend Spring Boot
});

// ➜ Intercepteur pour ajouter automatiquement le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ➜ Intercepteur global pour gérer les erreurs serveur
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API :", error);

    // Exemple : invalider token si le backend renvoie 401
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default api;
