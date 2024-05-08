import React from 'react'
import PeraWallet from '../components/PeraWallet/PeraWallet.js'
import NavBar from '../components/NavBar/NavBar.js'
import MetaWorkersTab from '../components/MetaworkersDashboard/MetaWorkersTab.js'

export default function InvestorsDashboard() {
  const [, accountAddress, isConnectedToPeraWallet, handleConnectWalletClick] = PeraWallet()

  return (
    <>
      <NavBar
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleConnectWalletClick}
      />
      <MetaWorkersTab
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        accountAddress={accountAddress}
      />
    </>
  )
}
