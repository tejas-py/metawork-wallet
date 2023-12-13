import React from 'react'
import { checkAuthToken } from '../../blockchain/accounts'
import { create } from '../../blockchain/authToken'
import WalletAddressButton from '../WalletAddressButton/WalletAddressButton'
import AuthTokenButton from '../AuthTokenButton/AuthTokenButton'
import signTxn from '../../wallet/signTxn'
import sendTxn from '../../wallet/sendTxn'
import './HandleLogin.css'

async function mintMyNFT(walletClient, walletAddress) {
  const txn = await create(walletAddress)
  const signedTxn = await signTxn(walletClient, txn)
  const txId = await sendTxn(signedTxn)
  console.log(txId)
  return txId
}

async function authToken(walletClient, walletAddress) {
  const res = await checkAuthToken(walletAddress)

  if (res) {
    return (
      <>
        <div className="heading">
          <h1>Homepage</h1>
        </div>
        <div>
          <AuthTokenButton />
        </div>
        <div>
          <WalletAddressButton />
        </div>
      </>
    )
  }
  
  if (!res) {
    const txnId = await mintMyNFT(walletClient, walletAddress)
    return txnId
  }
}

export default function HandleLogin({
  walletClient,
  isConnectedToPeraWallet,
  handleConnectWalletClick,
  walletAddress,
}) {
  return (
    <div className="login-container">
      <button
        onClick={
          isConnectedToPeraWallet
            ? () => authToken(walletClient, walletAddress)
            : handleConnectWalletClick
        }
        className="login-button"
      >
        {isConnectedToPeraWallet ? 'Login' : 'Connect'}
      </button>
    </div>
  )
}
