import { useAuthStore } from "@/auth-layout/store/useAuthStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to="/log-in" replace />;
    }

    return children;
}

export default ProtectedRoute