import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './utils/router'
import { RouterProvider } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CssBaseline />
      <RouterProvider router={router} />
  </StrictMode>,
)
