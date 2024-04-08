import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toggleAppLoading } from '../../store/slices/LoadinAndNotifSlice.js'
import { investorDetails } from '../../backend/api.js'

async function assetId(walletAddress) {
  const investorInfo = await investorDetails(walletAddress)
  const authId = investorInfo.data.message.auth_id
  window.open(`https://app.dappflow.org/explorer/asset/${authId}`, '_blank')
}
export default function AuthTokenButton({ walletAddress }) {
  const dispatch = useDispatch()
  const location = useLocation()

  const isVisible = location.pathname === '/dashboard' || location.pathname === '/adminPortal'

  return (
    <button
      className="btn btn-accent btn-sm lg:btn-md text-accent bg-base-100 hover:text-base-100 px-2 lg:px-3"
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
