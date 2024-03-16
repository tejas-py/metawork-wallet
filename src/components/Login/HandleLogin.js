import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleAppLoading } from '../../store/slices/LoadinAndNotifSlice.js'
import HandleAuthToken from './HandleAuthToken.js'
import '../../app.css'

export default function HandleLogin({
  isConnectedToPeraWallet,
  handleConnectWalletClick,
  walletAddress,
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function handleLoginClick() {
    if (isConnectedToPeraWallet) {
      await HandleAuthToken(walletAddress, navigate)
    } else {
      handleConnectWalletClick()
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {isConnectedToPeraWallet ? (
        <p className="font-montserrat text-accent">Click here to login</p>
      ) : (
        <p className="font-montserrat text-accent">Connect to your wallet</p>
      )}
      <button
        className="font-montserrat bg-accent rounded-lg text-base-100 py-3 px-20"
        onClick={async () => {
          dispatch(toggleAppLoading(true))
          await handleLoginClick()
          dispatch(toggleAppLoading(false))
        }}
      >
        {isConnectedToPeraWallet ? 'Login' : 'Connect'}
      </button>
    </div>
  )
}
