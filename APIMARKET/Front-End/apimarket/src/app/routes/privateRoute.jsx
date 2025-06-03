"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const router = useRouter();
  const { user, loadingUser } = useAuth();

  useEffect(() => {
    if (!loadingUser) { // Esperar a que se termine de cargar el user
      if (!user) {
        router.replace("/responsible/login");
      } else if (
        requiredRole &&
        (Array.isArray(requiredRole)
          ? !requiredRole.includes(user.rol)
          : user.rol !== requiredRole)
      ) {
        router.replace("/responsible/login");
      }
    }
  }, [user, requiredRole, router, loadingUser]);

  if (loadingUser) return null; // Mientras carga, no mostrar nada

  if (!user) return null;

  if (
    requiredRole &&
    (Array.isArray(requiredRole)
      ? !requiredRole.includes(user.rol)
      : user.rol !== requiredRole)
  )
    return null;

  return children;
};

export default PrivateRoute;
