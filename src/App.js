import React from 'react'
import PeraWallet from './components/PeraWallet/PeraWallet.js'
import HandleLogin from './components/HandleLogin/HandleLogin.js'
import WalletAddressButton from './components/WalletAddressButton/WalletAddressButton.js'
import './App.css'

export default function App() {
  const [
    peraWallet,
    accountAddress,
    isConnectedToPeraWallet,
    handleConnectWalletClick,
    handleDisconnectWalletClick,
  ] = PeraWallet()

  return (
    <>
      <div className="heading">
        <h1>Welcome to the Metawork Wallet</h1>
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
