import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import TeachersView from './pages/TeachersView.tsx'
import SchoolView from './pages/SchoolView.tsx'
import FacultyView from './pages/FacultyView.tsx'
import DirectorDashboard from './pages/DirectorDashboard.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import TeacherViewer from './pages/TeacherViewer.tsx'

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
        element: <FacultyView/>
      },
      {
        path:"/school-view",
        element: <SchoolView/>
      },
      {
        path:"/teacher-view",
        element: <TeachersView/>
      },
      {
        path:"/teacher-viewer/:id",
        element: <TeacherViewer/>
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
