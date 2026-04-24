
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Dashboard from './features/dashboard/Dashboard'
import Project from './features/project/Project'
import MyTask from './features/my-task/MyTask'


function App() {

  return (
    <>
      
      <Routes>

        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="project" element={<Project />} />
          <Route path="my-task" element={<MyTask />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route> */}

      </Routes>
      
    </>
  )
}

export default App
