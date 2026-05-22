
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Dashboard from './features/dashboard/Dashboard'
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
import Project from './features/project/Project'
import ProjectDetail from './features/project/project-detail/ProjectDetail'
import ProjectTask from './features/project/project-detail/project-task/ProjectTask'
import ProjectSetting from './features/project/project-detail/project-setting/ProjectSetting'
import { useAuthStore } from './auth-layout/store/useAuthStore'
import { useEffect } from 'react'
import ProjectCalendar from './features/project/project-detail/project-calendar/ProjectCalendar'

function App() {

  const checkToken = useAuthStore((state) => state.checkToken);

  // console.log('app')

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <>
      <Toaster />
      
      <Routes> 

        <Route 
          path="workspace/:workspace_id" 
          element={<ProtectedRoute><Layout /></ProtectedRoute>}
        >  
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="project" element={<Project />} />
            <Route path="project/:project_id" element={<ProjectDetail />} >

              <Route path="task" element={<ProjectTask />} />
              <Route path="setting" element={<ProjectSetting />} />
              <Route path="calendar" element={<ProjectCalendar />} />

            </Route>
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
