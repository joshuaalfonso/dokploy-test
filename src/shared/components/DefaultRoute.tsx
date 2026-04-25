


import { useAuthStore } from '@/auth-layout/store/useAuthStore';
import { Navigate } from 'react-router-dom'

const DefaultRoute = () => {

    const user = useAuthStore((state) => state.user);

    return user ? <Navigate to={`/workspace/${user.default_workspace}/dashboard`} replace /> : <Navigate to="/log-in" replace />

}

export default DefaultRoute