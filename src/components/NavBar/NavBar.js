import React from 'react'
import { useLocation } from 'react-router-dom'
import SwitchView from './SwitchView'
import AuthTokenButton from './AuthTokenButton'
import WalletAddressButton from './WalletAddressButton'

export default function NavBar({
  accountAddress,
  isConnectedToPeraWallet,
  handleDisconnectWalletClick,
}) {
  const location = useLocation()

  function NavHeading() {
    if (location.pathname === '/') {
      return <h1 className="font-montserrat text-lg/5 lg:text-3xl text-accent pl-2.5">MetaWork</h1>
    }
    if (location.pathname === '/createAuthToken') {
      return (
        <h1 className="font-montserrat text-lg/5 lg:text-3xl text-accent pl-2.5">Registration</h1>
      )
    }
    if (location.pathname === '/investors') {
      return <h1 className="font-montserrat text-lg/5 lg:text-3xl text-accent pl-2.5">Investor</h1>
    }
    if (location.pathname === '/metaworkers') {
      return (
        <h1 className="font-montserrat text-lg/5 lg:text-3xl text-accent pl-2.5">MetaWorker</h1>
      )
    }
    if (location.pathname === '/adminPortal') {
      return (
        <h1 className="font-montserrat text-lg/5 lg:text-3xl text-accent pl-2.5">Admin Portal</h1>
      )
    }
  }

  return (
    <div className="navbar absolute bg-base-100 rounded-3xl drop-shadow-md transition duration-500 hover:drop-shadow-xl w-screen">
      <div className="flex-1">
        <NavHeading />
      </div>
      <div className="flex-none">
        <ul className="flex flex-row justify-evenly w-60 lg:w-80">
          <SwitchView accountAddress={accountAddress} />
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
