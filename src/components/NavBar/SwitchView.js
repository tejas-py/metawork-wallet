import React from 'react'
import { useNavigate } from 'react-router-dom'
import switchImage from '../../assets/admin-user-switch.png'
import { useLocation } from 'react-router-dom'
import '../../app.css'

export default function SwitchView({ isAdmin }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isVisible =
    isAdmin && (location.pathname === '/dashboard' || location.pathname === '/adminPortal')

  return (
    <button
      className="btn btn-accent btn-sm lg:btn-md rounded-2xl bg-base-100 border-none px-2 lg:px-3"
      style={{ display: isVisible ? '' : 'none' }}
      onClick={() => {
        if (location.pathname === '/dashboard') {
          navigate('/adminPortal')
        }
        if (location.pathname === '/adminPortal') {
          navigate('/dashboard')
        }
      }}
    >
      <img
        src={switchImage}
        viewBox="0 0 24 24"
        alt="Switch Dashboard"
        style={{ width: '20px', height: '20px' }}
      />
    </button>
  )
}
