import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5284/',
    headers: {'accept': '*/*',
        'Content-Type': 'application/json' 
        // Authorizer
        }
});

export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: "http://localhost:5284/",
//     headers: {
//         "Accept": "*/*",
//         "Content-Type": "application/json",
//     },
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers["Authorization"] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             console.error("Token inválido o expirado. Redirigiendo a login...");
//             window.location.href = "/responsible/login"; // Redirigir al login si el token no es válido.
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: "http://localhost:5284/", // URL de la API
//     headers: {
//         "Accept": "*/*", // Acepta cualquier tipo de contenido
//         "Content-Type": "application/json", // Los datos se enviarán en formato JSON
//     },
// });

// // Interceptor para agregar el token en las solicitudes
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token"); // Obtener el token del localStorage
//         console.log("Token en solicitud: ", token); // Verifica si el token está presente en el localStorage
//         if (token) {
//             config.headers["Authorization"] = `Bearer ${token}`; // Agregar el token al encabezado Authorization
//         }
//         return config;
//     },
//     (error) => {
//         console.error("Error en la solicitud:", error); // Verifica si hay algún error en la solicitud
//         return Promise.reject(error);
//     }
// );

// // Interceptor para manejar respuestas con error
// axiosInstance.interceptors.response.use(
//     (response) => response, // Si la respuesta es exitosa, devolverla
//     (error) => {
//         console.error("Error en la respuesta de la API: ", error.response ? error.response : error);
//         if (error.response?.status === 401) {
//             console.error("Token inválido o expirado. Redirigiendo a login...");
//             window.location.href = "/responsible/login"; // Redirigir al login si el token es inválido
//         } else {
//             console.error("Error inesperado al obtener la respuesta de la API.");
//         }
//         return Promise.reject(error); // Si hay otro tipo de error, rechazar la respuesta
//     }
// );

// export default axiosInstance;
