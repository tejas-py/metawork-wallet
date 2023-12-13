import React from 'react'
import AuthTokenButton from './AuthTokenButton/AuthTokenButton'
import WalletAddressButton from './WalletAddressButton/WalletAddressButton.js'
import PeraWallet from './PeraWallet/PeraWallet.js'

export default function Homepage() {
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
        <h1>Homepage</h1>
      </div>
      <div>
        <AuthTokenButton walletAddress={accountAddress} />
      </div>
      <WalletAddressButton
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleDisconnectWalletClick}
      />
    </>
  )
}
