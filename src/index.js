import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import './index.css'
import Login from './components/Login/Login'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './store'

// Routes
import Layout from './Layout'
import CreateAuthToken from './components/CreateAuthToken/CreateAuthToken'
import Dashboard from './components/Dashboard/Dashboard'
import AdminPortal from './components/AdminPortal/AdminPortal'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="adminPortal" element={<AdminPortal />} />
      <Route path="createAuthToken" element={<CreateAuthToken />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
