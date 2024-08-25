import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './routes/Landing.tsx'
import Login from './routes/Login.tsx'
import Home from './routes/Home.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import TeachersView from './pages/TeachersView.tsx'
import SchoolView from './pages/SchoolView.tsx'
import GeneralView from './pages/GeneralView.tsx'
import DirectorDashboard from './pages/DirectorDashboard.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path:"/admin-dashboard",
        element: <AdminDashboard/>
      },
      {
        path:"/director-dashboard",
        element: <DirectorDashboard/>
      },
      {
        path:"/faculty-view",
        element: <GeneralView/>
      },
      {
        path:"/school-view",
        element: <SchoolView/>
      },
      {
        path:"/teacher-view",
        element: <TeachersView/>
      },


    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
