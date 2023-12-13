import React from 'react'
import './AuthTokenButton.css'
import { authTokenInfo } from '../../blockchain/accounts'

async function assetId(walletAddress) {
  const assetinfo = await authTokenInfo(walletAddress)
  console.log('assetID:', assetinfo.assetId)
  window.open(`https://testnet.algoexplorer.io/asset/${assetinfo.assetId}`, '_blank')
}

export default function AuthTokenButton({ walletAddress }) {
  console.log(walletAddress)
  return (
    <button className="auth-token-button" onClick={async () => await assetId(walletAddress)}>
      My Auth Token
    </button>
  )
}
