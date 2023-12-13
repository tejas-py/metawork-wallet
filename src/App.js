import React from 'react'
import { PeraWalletConnect } from '@perawallet/connect'
import HandleLogin from './components/HandleLogin/HandleLogin.js'
import WalletAddressButton from './components/WalletAddressButton/WalletAddressButton.js'
import './App.css'

const peraWallet = new PeraWalletConnect()

function App() {
  const [accountAddress, setAccountAddress] = React.useState(null)
  const isConnectedToPeraWallet = Boolean(accountAddress)

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
      .catch((e) => console.log(e))
  }, [])

  return (
    <>
      <div className="heading">
        <h1>Welcome to the Metawork Portal</h1>
      </div>
      <div>
        <WalletAddressButton
          isConnectedToPeraWallet={isConnectedToPeraWallet}
          walletAddress={accountAddress}
          handleDisconnectWalletClick={handleDisconnectWalletClick}
        />
      </div>
      <HandleLogin
        walletClient={peraWallet}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleConnectWalletClick={handleConnectWalletClick}
        walletAddress={accountAddress}
      />
    </>
  )

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
}

export default App
