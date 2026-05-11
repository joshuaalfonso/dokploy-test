
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Dashboard from './features/dashboard/Dashboard'
import Project from './features/project/Project'
import MyTask from './features/my-task/MyTask'
import AuthLayout from './auth-layout/AuthLayout'
import LogIn from './features/login/LogIn'
import SignUp from './features/signup/SignUp'
import ProtectedRoute from './shared/components/ProtectedRoute'
import { Toaster } from './components/ui/toaster'
import PublicRoute from './shared/components/PublicRoute'
import DefaultRoute from './shared/components/DefaultRoute'
import EmailVerification from './features/email-verification/EmailVerification'
import WorkspaceMember from './features/workspace-member/WorkspaceMember'
import WorkspaceSetting from './features/workspace-setting/WorkspaceSetting'


function App() {

  return (
    <>
      <Toaster />
      
      <Routes>

        <Route path="workspace/:workspace_id" element={<ProtectedRoute><Layout /></ProtectedRoute>}>  
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="project" element={<Project />} />
            <Route path="my-task" element={<MyTask />} />
            <Route path="member" element={<WorkspaceMember />} />
            <Route path="setting" element={<WorkspaceSetting />} />
        </Route>

        <Route 
          path="/" 
          element={<DefaultRoute />} 
        />

        <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
          <Route path="log-in" element={<LogIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="verification" element={<EmailVerification />} />
        </Route>

      </Routes>
      
    </>
  )
}

export default App
