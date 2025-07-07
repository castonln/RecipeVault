import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ErrorProvider } from './context/ErrorContext'
import { router } from './utils/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <AuthProvider>
      <ErrorProvider>
        <RouterProvider router={router} />
      </ErrorProvider>
    </AuthProvider>
  </StrictMode>,
)
