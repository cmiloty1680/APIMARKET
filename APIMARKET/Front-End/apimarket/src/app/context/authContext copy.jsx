"use client";
import { createContext, useState, useContext, useEffect } from 'react';

// Se crea el contexto de autenticación. Esto es como una "caja" global que luego se puede compartir entre componentes.
const AuthContext = createContext();

// Componente que envuelve a la app o parte de ella y proporciona el contexto a los hijos (children)
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Al cargar el componente, intenta recuperar el usuario desde el localStorage
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const name = localStorage.getItem("name");
        const rol = localStorage.getItem("rol");

        // Si encuentra todos los datos, los guarda en el estado user
        if (token && email && name && rol) {
            setUser({ token, email, name, rol });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("rol");

        setUser(null); // Limpia el estado de usuario
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {/* Renderiza todo lo que envuelve este contexto */}
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acceder fácilmente al contexto desde cualquier componente
export const useAuth = () => useContext(AuthContext);
