import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleAppLoading } from '../../store/slices/LoadinAndNotifSlice.js'
import { userDetails } from '../../backend/api.js'

async function assetId(walletAddress) {
  const investorInfo = await userDetails(walletAddress)
  const authId = investorInfo.data.message.auth_id
  window.open(`https://app.dappflow.org/explorer/asset/${authId}`, '_blank')
}
export default function AuthTokenButton({ walletAddress }) {
  const dispatch = useDispatch()

  return (
    <button
      className="btn btn-accent btn-sm lg:btn-md text-accent bg-base-100 hover:text-base-100 px-2 lg:px-3"
      onClick={async () => {
        dispatch(toggleAppLoading(true))
        await assetId(walletAddress)
        dispatch(toggleAppLoading(false))
      }}
    >
      My Token
    </button>
  )
}
