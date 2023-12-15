import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthTokenButton from '../AuthTokenButton/AuthTokenButton.js'
import WalletAddressButton from '../WalletAddressButton/WalletAddressButton.js'
import PeraWallet from '../PeraWallet/PeraWallet.js'

export default function Dashboard() {
  const [, accountAddress, isConnectedToPeraWallet, , handleDisconnectWalletClick] = PeraWallet()
  const navigate = useNavigate()

  React.useEffect(() => {
    const verifyWalletConnect = async () => {
      if (!isConnectedToPeraWallet) {
        navigate('/')
      }
    }
    verifyWalletConnect()
  }, [navigate, accountAddress, isConnectedToPeraWallet])

  return (
    <>
      <div className="heading">
        <h1>User Dashboard</h1>
      </div>
      <div>
        <AuthTokenButton walletAddress={accountAddress} />
      </div>
      <WalletAddressButton
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleDisconnectWalletClick}
      />
    </>
  )
}
