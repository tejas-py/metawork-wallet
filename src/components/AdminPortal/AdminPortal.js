import React from 'react'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import './adminPortal.css'

export default function AdminPortal() {
  const [, accountAddress, isConnectedToPeraWallet, , handleDisconnectWalletClick] = PeraWallet()

  return <></>
}
