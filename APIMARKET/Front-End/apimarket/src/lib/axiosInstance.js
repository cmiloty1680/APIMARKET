import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://173.254.0.220:5000/',
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
        console.log("Petición con config:", config); // 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
