import React from 'react'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import NavBar from '../NavBar/NavBar'
import AssetsTable from './AssetsTable.js'

export default function Dashboard() {
  const [, accountAddress, isConnectedToPeraWallet, handleConnectWalletClick] = PeraWallet()

  return (
    <>
      <NavBar
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleConnectWalletClick}
      />
      <AssetsTable
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        accountAddress={accountAddress}
      />
    </>
  )
}
