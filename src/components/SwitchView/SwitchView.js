import React from 'react'
import { useNavigate } from 'react-router-dom'
import switchImage from '../../assets/admin-user-switch.png'
import { useLocation } from 'react-router-dom'
import './switchView.css'

export default function SwitchView({ isAdmin }) {
  const navigate = useNavigate()
  const location = useLocation()

  // return isAdmin ? (
  //   <img
  //     src={switchImage}
  //     alt="Switch Dashboard"
  //     className="switch"
  // onClick={() => {
  //   if (location.pathname === '/dashboard') {
  //     navigate('/adminPortal')
  //   }
  //   if (location.pathname === '/adminPortal') {
  //     navigate('/dashboard')
  //   }
  // }}
  //   />
  // ) : null

  function DisplayText() {
    if (location.pathname === '/dashboard') {
      return 'To Admin'
    }
    if (location.pathname === '/adminPortal') {
      return 'To User'
    }
  }

  return isAdmin ? (
    <button
      className="switchView"
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
  ) : null
}
