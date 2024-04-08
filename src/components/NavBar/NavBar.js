import React from 'react'
import { useLocation } from 'react-router-dom'
import SwitchView from './SwitchView'
import AuthTokenButton from './AuthTokenButton'
import WalletAddressButton from './WalletAddressButton'
import { investorDetails } from '../../backend/api'

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
      if (connectedUserDetails.success === true) {
        const userType = connectedUserDetails.data.message.user_type
        setIsAdmin(userType === 'admin')
      } else {
        setIsAdmin(false)
      }
    }
    if (accountAddress) {
      fetchAdminStatus()
    }
  }, [accountAddress])

  function NavHeading() {
    if (location.pathname === '/') {
      return <h1 className="font-montserrat text-lg/5 lg:text-3xl text-accent pl-2.5">MetaWork</h1>
    }
    if (location.pathname === '/createAuthToken') {
      return (
        <h1 className="font-montserrat text-lg/5 lg:text-3xl text-accent pl-2.5">Registration</h1>
      )
    }
    if (location.pathname === '/dashboard') {
      return (
        <h1 className="font-montserrat text-lg/5 lg:text-3xl text-accent pl-2.5">User Portal</h1>
      )
    }
    if (location.pathname === '/adminPortal') {
      return (
        <h1 className="font-montserrat text-lg/5 lg:text-3xl text-accent pl-2.5">Admin Portal</h1>
      )
    }
  }

  return (
    <div className="navbar absolute bg-base-100 rounded-3xl drop-shadow-md transition duration-500 hover:drop-shadow-xl">
      <div className="flex-1">
        <NavHeading />
      </div>
      <div className="flex-none">
        <ul className="flex flex-row justify-evenly w-72 lg:w-80">
          <SwitchView isAdmin={isAdmin} />
          <AuthTokenButton walletAddress={accountAddress} />
          <WalletAddressButton
            accountAddress={accountAddress}
            isConnectedToPeraWallet={isConnectedToPeraWallet}
            handleDisconnectWalletClick={handleDisconnectWalletClick}
          />
        </ul>
      </div>
    </div>
  )
}
