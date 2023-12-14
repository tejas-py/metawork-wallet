import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleAppLoading } from '../../store/slices/LoadinAndNotifSlice.js'
import { authTokenInfo } from '../../blockchain/accounts'
import './AuthTokenButton.css'

async function assetId(walletAddress) {
  const assetinfo = await authTokenInfo(walletAddress)
  window.open(`https://testnet.algoexplorer.io/asset/${assetinfo.assetId}`, '_blank')
}

export default function AuthTokenButton({ walletAddress }) {
  const dispatch = useDispatch()
  return (
    <button
      className="auth-token-button"
      onClick={async () => {
        dispatch(toggleAppLoading(true))
        await assetId(walletAddress)
        dispatch(toggleAppLoading(false))
      }}
    >
      My Auth Token
    </button>
  )
}
