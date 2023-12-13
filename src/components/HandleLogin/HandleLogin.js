import React from 'react'
import { useNavigate } from 'react-router-dom'
import { checkAuthToken } from '../../blockchain/accounts'
import './HandleLogin.css'

async function authToken(walletAddress, navigate) {
  const res = await checkAuthToken(walletAddress)
  if (res) {
    navigate('/homepage')
  }
  if (!res) {
    navigate('/createAuthToken')
  }
}

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
              ? () => authToken(walletAddress, navigate)
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
