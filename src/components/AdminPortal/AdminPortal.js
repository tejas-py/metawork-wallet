import React from 'react'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import NavBar from '../NavBar/NavBar'
import './adminPortal.css'
import AdminTab from './AdminTabs.js'

export default function AdminPortal() {
  const [, accountAddress, isConnectedToPeraWallet, handleConnectWalletClick] = PeraWallet()

  return (
    <>
      <NavBar
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleConnectWalletClick}
      />
      <AdminTab />
    </>
  )
}
