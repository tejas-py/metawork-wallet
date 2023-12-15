import React from 'react'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import HandleLogin from './HandleLogin.js'
import WalletAddressButton from '../WalletAddressButton/WalletAddressButton.js'
import '../../App.css'

export default function Login() {
  const [
    ,
    accountAddress,
    isConnectedToPeraWallet,
    handleConnectWalletClick,
    handleDisconnectWalletClick,
  ] = PeraWallet()

  return (
    <>
      <div className="heading">
        <h1>Welcome to the Metawork Portal</h1>
      </div>
      <WalletAddressButton
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleDisconnectWalletClick}
      />
      <HandleLogin
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleConnectWalletClick={handleConnectWalletClick}
        walletAddress={accountAddress}
      />
    </>
  )
}
