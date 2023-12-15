import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleAppLoading } from '../../store/slices/LoadinAndNotifSlice.js'
import HandleAuthToken from './HandleAuthToken.js'
import './HandleLogin.css'

export default function HandleLogin({
  isConnectedToPeraWallet,
  handleConnectWalletClick,
  walletAddress,
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function DisplayText() {
    if (isConnectedToPeraWallet) {
      return <p>Click here to login</p>
    } else {
      return <p>Click to connect to your wallet</p>
    }
  }

  async function handleLoginClick() {
    if (isConnectedToPeraWallet) {
      console.log('IM HIT TO CHECK THE AUTH TOKEN')
      await HandleAuthToken(walletAddress, navigate)
    } else {
      handleConnectWalletClick()
    }
  }

  return (
    <div className="login-container">
      <DisplayText />
      <div>
        <button
          onClick={async () => {
            dispatch(toggleAppLoading(true))
            console.log('IM HIT TO HANDLE LOGIN')
            await handleLoginClick()
            dispatch(toggleAppLoading(false))
          }}
          className="login-button"
        >
          {isConnectedToPeraWallet ? 'Login' : 'Connect'}
        </button>
      </div>
    </div>
  )
}
