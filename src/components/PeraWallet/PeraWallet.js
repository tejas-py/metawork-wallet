import React from 'react'
import { PeraWalletConnect } from '@perawallet/connect'
import { useNavigate } from 'react-router-dom'

const peraWallet = new PeraWalletConnect()

export default function PeraWallet() {
  const [accountAddress, setAccountAddress] = React.useState(null)
  const isConnectedToPeraWallet = !!accountAddress
  const navigate = useNavigate()

  React.useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on('disconnect', handleDisconnectWalletClick)
        if (accounts.length) {
          setAccountAddress(accounts[0])
        }
      })
      .catch(() => console.error('WALLET NOT CONNECTED'))
    // Redirect to home page if wallet is not connected
    const verifyWalletConnect = () => {
      if (!peraWallet.isConnected) {
        navigate('/')
      }
    }
    verifyWalletConnect()
  }, [navigate])

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on('disconnect', handleDisconnectWalletClick)
        setAccountAddress(newAccounts[0])
      })
      .catch((error) => {
        if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
          console.log(error)
        }
      })
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect()
    setAccountAddress(null)
  }
  return [
    peraWallet,
    accountAddress,
    isConnectedToPeraWallet,
    handleConnectWalletClick,
    handleDisconnectWalletClick,
  ]
}
