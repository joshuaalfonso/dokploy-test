import { useAuthStore } from "@/auth-layout/store/useAuthStore";
import type React from "react";
import { Navigate } from "react-router-dom";




const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useAuthStore((state) => state.user);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;