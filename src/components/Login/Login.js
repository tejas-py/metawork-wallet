import React from 'react'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import NavBar from '../NavBar/NavBar'
import HandleLogin from './HandleLogin.js'
import '../../App.css'

export default function Login() {
  const [, accountAddress, isConnectedToPeraWallet, handleConnectWalletClick] = PeraWallet()

  return (
    <>
      <NavBar
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleConnectWalletClick}
      />
      <HandleLogin
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleConnectWalletClick={handleConnectWalletClick}
        walletAddress={accountAddress}
      />
    </>
  )
}
