"use client";
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);  // Estado para controlar carga de usuario

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");
        const rol = localStorage.getItem("rol");

        if (token && email && username && rol) {
            setUser({ token, email, username, rol });
        }
        setLoadingUser(false);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        localStorage.removeItem("rol");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loadingUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
