import React from 'react'
import AuthTokenButton from '../AuthTokenButton/AuthTokenButton.js'
import WalletAddressButton from '../WalletAddressButton/WalletAddressButton.js'
import PeraWallet from '../PeraWallet/PeraWallet.js'

export default function Dashboard() {
  const [, accountAddress, isConnectedToPeraWallet, , handleDisconnectWalletClick] = PeraWallet()
  return (
    <>
      <div className="heading">
        <h1>User Dashboard</h1>
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
