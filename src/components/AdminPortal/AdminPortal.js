import React from 'react'
import AuthTokenButton from '../AuthTokenButton/AuthTokenButton.js'
import WalletAddressButton from '../WalletAddressButton/WalletAddressButton.js'
import SwitchView from '../SwitchView/SwitchView.js'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import { checkAuthToken } from '../../blockchain/accounts.js'
import './adminPortal.css'

export default function AdminPortal() {
  const [, accountAddress, isConnectedToPeraWallet, , handleDisconnectWalletClick] = PeraWallet()

  async function isAdmin() {
    const connectedUser = await checkAuthToken(accountAddress)
    if (connectedUser === 'admin') {
      return true
    } else return false
  }

  return (
    <>
      <div className="heading">
        <h1>Admin Dashboard</h1>
      </div>
      <div>
        <AuthTokenButton walletAddress={accountAddress} />
      </div>
      <div>
        <SwitchView isAdmin={isAdmin} />
        <WalletAddressButton
          accountAddress={accountAddress}
          isConnectedToPeraWallet={isConnectedToPeraWallet}
          handleDisconnectWalletClick={handleDisconnectWalletClick}
        />
      </div>
    </>
  )
}
