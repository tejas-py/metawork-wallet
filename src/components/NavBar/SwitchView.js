import React from 'react'
import { useNavigate } from 'react-router-dom'
import switchImage from '../../assets/admin-user-switch.png'
import { useLocation } from 'react-router-dom'
import { userDetails } from '../../backend/api'

export default function SwitchView({ accountAddress }) {
  const navigate = useNavigate()
  const location = useLocation()

  const userType = sessionStorage.getItem('userType')
  const isVisible =
    (userType === 'both' || userType === 'admin') &&
    (location.pathname === '/investors' || location.pathname === '/metaworkers')

  React.useEffect(() => {
    async function fetchUserType() {
      const connectedUserDetails = await userDetails(accountAddress)
      if (connectedUserDetails.success === true) {
        const user_type = connectedUserDetails.data.message.user_type
        sessionStorage.setItem('userType', user_type)
      } else {
        sessionStorage.setItem('userType', 'none')
      }
    }
    if (
      sessionStorage.getItem('userType') === 'none' ||
      sessionStorage.getItem('userType') === undefined
    ) {
      fetchUserType()
    }
  }, [accountAddress])

  return (
    <button
      className="btn btn-accent btn-sm lg:btn-md rounded-2xl bg-base-100 border-none px-2 lg:px-3"
      style={{ display: isVisible ? '' : 'none' }}
      onClick={() => {
        if (userType === 'both') {
          if (location.pathname === '/investors') {
            navigate('/metaworkers')
          }
          if (location.pathname === '/metaworkers') {
            navigate('/investors')
          }
        }
        if (userType === 'admin') {
          if (location.pathname === '/investors') {
            navigate('/adminPortal')
          }
          if (location.pathname === '/adminPortal') {
            navigate('/investors')
          }
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
