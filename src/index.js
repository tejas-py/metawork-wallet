import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import './app.css'

// Routes
import Layout from './Layout'
import Login from './pages/Login'
import CreateAuthToken from './pages/CreateAuthToken'
import InvestorsDashboard from './pages/InvestorsDashboard'
import MetaworkersDashboard from './pages/MetaworkersDashboard'
import AdminPortal from './pages/AdminPortal'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Login />} />
      <Route path="metaworkers" element={<MetaworkersDashboard />} />
      <Route path="investors" element={<InvestorsDashboard />} />
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
