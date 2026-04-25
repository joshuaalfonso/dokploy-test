
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Dashboard from './features/dashboard/Dashboard'
import Project from './features/project/Project'
import MyTask from './features/my-task/MyTask'
import AuthLayout from './auth-layout/AuthLayout'
import LogIn from './features/login/LogIn'
import SignUp from './features/signup/SignUp'
import ProtectedRoute from './shared/components/ProtectedRoute'


function App() {

  return (
    <>
      
      <Routes>

        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>  
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="project" element={<Project />} />
          <Route path="my-task" element={<MyTask />} />
        </Route>

        <Route 
          path="/" 
          element={<Navigate to="/log-in" replace />} 
        />

        <Route element={<AuthLayout />}>
          <Route path="log-in" element={<LogIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>

      </Routes>
      
    </>
  )
}

export default App
