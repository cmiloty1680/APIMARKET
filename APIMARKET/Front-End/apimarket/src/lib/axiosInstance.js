import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5284/',
    headers: {'accept': '*/*',
        'Content-Type': 'application/json' 
        // Authorizer
        }
});

export default axiosInstance;
