import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleAppLoading } from '../store/slices/LoadinAndNotifSlice.js'
import { createInvestor } from '../backend/api.js'
import MintMyNFT from '../components/CreateAuthToken/MintMyNFT.js'
import { authTokenInfo } from '../blockchain/accounts.js'
import { investorDetails } from '../backend/api.js'
import PeraWallet from '../components/PeraWallet/PeraWallet.js'
import NavBar from '../components/NavBar/NavBar.js'
import '../components/Login/HandleLogin.css'

export default function CreateAuthToken() {
  const [peraWallet, accountAddress, isConnectedToPeraWallet, handleConnectWalletClick] =
    PeraWallet()
  const [nftMinted, setNftMinted] = React.useState(false)
  const [nftTxnId, setNftTxnId] = React.useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const verifyUser = async () => {
      const result = await investorDetails(accountAddress)

      if (result.data.message.user_type === 'investor') {
        navigate('/dashboard')
      }

      if (result.data.message.user_type === 'admin') {
        navigate('/adminPortal')
      }
    }
    verifyUser()
  }, [navigate, accountAddress, isConnectedToPeraWallet])

  return (
    <>
      <NavBar
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleConnectWalletClick}
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
                const createdAuthIdTxnId = await MintMyNFT(peraWallet, accountAddress)
                const authId = await authTokenInfo(accountAddress)
                if (createdAuthIdTxnId) {
                  setNftTxnId(createdAuthIdTxnId)
                  setNftMinted(true)
                  const investorInfo = {
                    auth_id: String(authId),
                    wallet_address: `${accountAddress}`,
                    total_investments: 0,
                    total_withdrawn: 0,
                    registration_date_time: null,
                    last_online: null,
                    total_yield: null,
                    trade_history: null,
                    holding: null,
                  }
                  await createInvestor(investorInfo)
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
                window.open(`https://app.dappflow.org/explorer/transaction/${nftTxnId}`, '_blank')
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
