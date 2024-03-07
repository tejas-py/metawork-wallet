import React from 'react'
import { useLocation } from 'react-router-dom'
import SwitchView from './SwitchView'
import AuthTokenButton from './AuthTokenButton'
import WalletAddressButton from './WalletAddressButton'
import { investorDetails } from '../../backend/api'
import './NavBar.css'

export default function NavBar({
  accountAddress,
  isConnectedToPeraWallet,
  handleDisconnectWalletClick,
}) {
  const location = useLocation()
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
    async function fetchAdminStatus() {
      const connectedUserDetails = await investorDetails(accountAddress)
      const userType = connectedUserDetails.data.message.user_type
      setIsAdmin(userType === 'admin')
    }
    if (accountAddress) {
      fetchAdminStatus()
    }
  }, [accountAddress])

  function NavHeading() {
    if (location.pathname === '/') {
      return <h1 className="heading">Welcome to the Metawork Portal</h1>
    }
    if (location.pathname === '/createAuthToken') {
      return <h1 className="heading">Registration</h1>
    }
    if (location.pathname === '/dashboard') {
      return <h1 className="heading">User Dashboard</h1>
    }
    if (location.pathname === '/adminPortal') {
      return <h1 className="heading">Admin Portal</h1>
    }
  }

  return (
    <div className="navBar">
      <div className="heading-div">
        <NavHeading />
      </div>
      <div className="userInteraction">
        <SwitchView isAdmin={isAdmin} />
        <AuthTokenButton walletAddress={accountAddress} />
        <WalletAddressButton
          accountAddress={accountAddress}
          isConnectedToPeraWallet={isConnectedToPeraWallet}
          handleDisconnectWalletClick={handleDisconnectWalletClick}
        />
      </div>
    </div>
  )
}
