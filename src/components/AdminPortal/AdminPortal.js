import React from 'react'
import AuthTokenButton from '../AuthTokenButton/AuthTokenButton.js'
import WalletAddressButton from '../WalletAddressButton/WalletAddressButton.js'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import './adminPortal.css'

export default function AdminPortal() {
  const [, accountAddress, isConnectedToPeraWallet, , handleDisconnectWalletClick] = PeraWallet()

  return (
    <>
      <div className="heading">
        <h1>Admin Portal</h1>
      </div>
      <div>
        <AuthTokenButton walletAddress={accountAddress} />
        <WalletAddressButton
          accountAddress={accountAddress}
          isConnectedToPeraWallet={isConnectedToPeraWallet}
          handleDisconnectWalletClick={handleDisconnectWalletClick}
        />
      </div>
    </>
  )
}
