import type React from "react";
import { Navigate } from "react-router-dom";





const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = false; // replace with real auth logic

    if (!isAuthenticated) {
        return <Navigate to="login" replace />;
    }

    return children;
}

export default ProtectedRoute