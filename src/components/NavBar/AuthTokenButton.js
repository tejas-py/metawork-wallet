import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toggleAppLoading } from '../../store/slices/LoadinAndNotifSlice.js'
import { authTokenInfo } from '../../blockchain/accounts'
import './NavBar.css'

async function assetId(walletAddress) {
  const assetinfo = await authTokenInfo(walletAddress)
  window.open(`https://app.dappflow.org/explorer/asset/${assetinfo}`, '_blank')
}
export default function AuthTokenButton({ walletAddress }) {
  const dispatch = useDispatch()
  const location = useLocation()

  const isVisible = location.pathname === '/dashboard' || location.pathname === '/adminPortal'

  return (
    <button
      className="auth-token-button"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
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
