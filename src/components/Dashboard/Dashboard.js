import React from 'react'
import SwitchView from '../SwitchView/SwitchView.js'
import AuthTokenButton from '../AuthTokenButton/AuthTokenButton.js'
import WalletAddressButton from '../WalletAddressButton/WalletAddressButton.js'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import AssetsTable from './AssetsTable.js'
import { checkAuthToken } from '../../blockchain/accounts.js'

export default function Dashboard() {
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
        <h1>User Dashboard</h1>
      </div>
      <div>
        <AuthTokenButton walletAddress={accountAddress} />
      </div>
      <SwitchView isAdmin={isAdmin} />
      <WalletAddressButton
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleDisconnectWalletClick}
      />
      <AssetsTable
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        accountAddress={accountAddress}
      />
    </>
  )
}
