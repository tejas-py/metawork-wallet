import React from 'react'
import { useNavigate } from 'react-router-dom'
import switchImage from '../../assets/admin-user-switch.png'
import { useLocation } from 'react-router-dom'
import './NavBar.css'

export default function SwitchView({ isAdmin }) {
  const navigate = useNavigate()
  const location = useLocation()

  const isVisible =
    isAdmin && (location.pathname === '/dashboard' || location.pathname === '/adminPortal')

  return (
    <button
      className="switchView"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      onClick={() => {
        if (location.pathname === '/dashboard') {
          navigate('/adminPortal')
        }
        if (location.pathname === '/adminPortal') {
          navigate('/dashboard')
        }
      }}
    >
      <img src={switchImage} alt="Switch Dashboard" style={{ width: '25px', height: '25px' }} />
    </button>
  )
}