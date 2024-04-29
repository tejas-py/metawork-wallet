import React from 'react'
import PeraWallet from '../components/PeraWallet/PeraWallet.js'
import NavBar from '../components/NavBar/NavBar.js'
import AssetsTable from '../components/MetaworkersDashboard/AssetsTable.js'

export default function InvestorsDashboard() {
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
