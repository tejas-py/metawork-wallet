import React from 'react'
import { useNavigate } from 'react-router-dom'
import HandleAuthToken from './HandleAuthToken.js'
import './HandleLogin.css'

export default function HandleLogin({
  isConnectedToPeraWallet,
  handleConnectWalletClick,
  walletAddress,
}) {
  const navigate = useNavigate()

  function DisplayText() {
    if (isConnectedToPeraWallet) {
      return <p>Click here to login</p>
    } else {
      return <p>Click to connect to your wallet</p>
    }
  }

  return (
    <div className="login-container">
      <DisplayText />
      <div>
        <button
          onClick={
            isConnectedToPeraWallet
              ? async () => {
                  await HandleAuthToken(walletAddress, navigate)
                }
              : handleConnectWalletClick
          }
          className="login-button"
        >
          {isConnectedToPeraWallet ? 'Login' : 'Connect'}
        </button>
      </div>
    </div>
  )
}
