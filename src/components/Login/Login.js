import React from 'react'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import HandleLogin from './HandleLogin.js'
import '../../App.css'

export default function Login() {
  const [, accountAddress, isConnectedToPeraWallet, handleConnectWalletClick] = PeraWallet()

  return (
    <>
      <HandleLogin
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleConnectWalletClick={handleConnectWalletClick}
        walletAddress={accountAddress}
      />
    </>
  )
}
