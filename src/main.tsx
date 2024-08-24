import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Form, RouterProvider } from 'react-router-dom'
import Landing from './routes/landing.tsx'
import Login from './routes/login.tsx'
import Home from './routes/home.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path:"/home",
        element: <Home/>
      }
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
