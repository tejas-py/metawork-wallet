import React from 'react'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import NavBar from '../NavBar/NavBar'
import './adminPortal.css'

export default function AdminPortal() {
  const [, accountAddress, isConnectedToPeraWallet, handleConnectWalletClick] = PeraWallet()

  return (
    <>
      <NavBar
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleConnectWalletClick}
      />
    </>
  )
}
