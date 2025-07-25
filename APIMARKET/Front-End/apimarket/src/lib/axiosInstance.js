import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5284/',
    headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
        // Authorization se añade dinámicamente
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;