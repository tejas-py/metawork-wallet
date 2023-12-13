import React from 'react'
import { useNavigate } from 'react-router-dom';
import { checkAuthToken } from '../../blockchain/accounts'
import { create } from '../../blockchain/authToken'
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

async function authToken(walletClient, walletAddress, navigate) {
  const res = await checkAuthToken(walletAddress)

  if (res) {
    navigate('/homepage');
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
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <button
        onClick={
          isConnectedToPeraWallet
            ? () => authToken(walletClient, walletAddress, navigate)
            : handleConnectWalletClick
        }
        className="login-button"
      >
        {isConnectedToPeraWallet ? 'Login' : 'Connect'}
      </button>
    </div>
  )
}
