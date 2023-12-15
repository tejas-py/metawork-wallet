import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleAppLoading } from '../../store/slices/LoadinAndNotifSlice.js'
import MintMyNFT from './MintMyNFT.js'
import WalletAddressButton from '../WalletAddressButton/WalletAddressButton.js'
import { checkAuthToken } from '../../blockchain/accounts'
import PeraWallet from '../PeraWallet/PeraWallet.js'
import '../Login/HandleLogin.css'

export default function CreateAuthToken() {
  const [nftMinted, setNftMinted] = React.useState(false)
  const [nftTxnId, setNftTxnId] = React.useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [peraWallet, accountAddress, isConnectedToPeraWallet, , handleDisconnectWalletClick] =
    PeraWallet()

  React.useEffect(() => {
    const verifyToken = async () => {
      const res = await checkAuthToken(accountAddress)
      if (res) {
        navigate('/dashboard')
      }
    }
    const verifyWalletConnect = async () => {
      if (!isConnectedToPeraWallet) {
        navigate('/')
      }
    }
    verifyWalletConnect()
    verifyToken()
  }, [navigate, accountAddress, isConnectedToPeraWallet])

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
                dispatch(toggleAppLoading(true))
                const txn = await MintMyNFT(peraWallet, accountAddress)
                if (txn) {
                  setNftTxnId(txn)
                  setNftMinted(true)
                }
                dispatch(toggleAppLoading(false))
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
                navigate('/dashboard')
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
