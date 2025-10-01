import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import { Layout } from './pages/Layout'
import { Overview } from './pages/Overview'
import { RiskMap } from './pages/RiskMap'
import { Alerts } from './pages/Alerts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'map', element: <RiskMap /> },
      { path: 'alerts', element: <Alerts /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

