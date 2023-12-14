import React from 'react'
import WalletAddressButton from './WalletAddressButton/WalletAddressButton.js'
import PeraWallet from './PeraWallet/PeraWallet.js'
import { create } from '../blockchain/authToken'
import signTxn from '../wallet/signTxn'
import sendTxn from '../wallet/sendTxn'
import './HandleLogin/HandleLogin.css'

async function mintMyNFT(walletClient, walletAddress) {
  const txn = await create(walletAddress)
  const signedTxn = await signTxn(walletClient, txn)
  const txId = await sendTxn(signedTxn)
  return txId
}

export default function CreateAuthToken() {
  const [nftMinted, setNftMinted] = React.useState(false)
  const [nftTxnId, setNftTxnId] = React.useState('')

  const [peraWallet, accountAddress, isConnectedToPeraWallet, , handleDisconnectWalletClick] =
    PeraWallet()

  return (
    <>
      <div className="heading">
        <h1>Registration</h1>
      </div>
      <WalletAddressButton
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleDisconnectWalletClick}
      />
      <div className="middle-container">
        {!nftMinted ? (
          <>
            <p>
              Please click to approve. This will create your own personalized NFT for the platform.
              You will then use this NFT login to the system.
            </p>
            <button
              onClick={async () => {
                const txn = await mintMyNFT(peraWallet, accountAddress)
                if (txn) {
                  setNftTxnId(txn)
                  setNftMinted(true)
                }
              }}
            >
              Mint my NFT
            </button>
          </>
        ) : (
          <>
            <p>Success! Look at your shiny new NFT</p>
            <button
              onClick={() => {
                window.open(`https://testnet.algoexplorer.io/tx/${nftTxnId}`, '_blank')
              }}
            >
              View NFT
            </button>
          </>
        )}
      </div>
    </>
  )
}
