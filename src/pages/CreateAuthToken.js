import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleAppLoading } from '../store/slices/LoadinAndNotifSlice.js'
import MintMyNFT from '../components/CreateAuthToken/MintMyNFT.js'
import { authTokenInfo } from '../blockchain/accounts.js'
import { userDetails, createUser } from '../backend/api.js'
import PeraWallet from '../components/PeraWallet/PeraWallet.js'
import NavBar from '../components/NavBar/NavBar.js'

export default function CreateAuthToken() {
  const [peraWallet, accountAddress, isConnectedToPeraWallet, handleConnectWalletClick] =
    PeraWallet()
  const [nftMinted, setNftMinted] = React.useState(false)
  const [nftTxnId, setNftTxnId] = React.useState('')
  const [selectedUserType, setSelectedUserType] = React.useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function pickRandomObject(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  React.useEffect(() => {
    const verifyUser = async () => {
      const result = await userDetails(accountAddress)

      if (
        result.data.message.user_type === 'investor' ||
        result.data.message.user_type === 'both'
      ) {
        navigate('/investors')
      }

      if (result.data.message.user_type === 'metaworker') {
        navigate('/metaworkers')
      }

      if (result.data.message.user_type === 'admin') {
        navigate('/adminPortal')
      }
    }
    verifyUser()
  }, [navigate, accountAddress, isConnectedToPeraWallet])

  function UserTypeForm() {
    // Event handler to update the selected option state.
    const handleSelectChange = (event) => {
      setSelectedUserType(event.target.value)
    }
    return (
      <label className="relative form-control my-4 w-full max-w-xs left-1/2 -translate-x-1/2">
        <select
          className="select select-accent text-neutral"
          onChange={handleSelectChange}
          defaultValue={selectedUserType}
        >
          <option disabled value="">
            Please select your User Type!
          </option>
          <option value="investor">Investor</option>
          <option value="metaworker">MetaWorker</option>
          <option value="both">Both</option>
        </select>
      </label>
    )
  }

  return (
    <>
      <NavBar
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleConnectWalletClick}
      />
      <div className="absolute bg-base-100 border border-neutral rounded-2xl shadow p-9 text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {!nftMinted ? (
          <>
            <p className="font-montserrat text-accent text-xl">
              This will create your own personalized NFT for the platform. You will then use this
              NFT login to the system.
            </p>
            <UserTypeForm />
            <button
              className="btn btn-accent btn-md font-montserrat text-base-100 px-10"
              disabled={!selectedUserType}
              onClick={async () => {
                dispatch(toggleAppLoading(true))
                const createdAuthIdTxnId = await MintMyNFT(peraWallet, accountAddress)
                const authId = await authTokenInfo(accountAddress)
                const tradeHistory = [
                  {
                    asset_name: pickRandomObject(['Genopets', 'Synesis One']),
                    amount: pickRandomObject([1, 2, 3, 4]),
                    price: 200,
                    time: pickRandomObject([
                      1710623973, 1710782220, 1710781251, 1710851154, 1711026187, 1710851085,
                      1709837934,
                    ]),
                    trade_type: pickRandomObject(['buy', 'buy', 'buy', 'sell']),
                  },
                  {
                    asset_name: pickRandomObject(['Genopets', 'Synesis One']),
                    amount: pickRandomObject([1, 2, 3, 4]),
                    price: 200,
                    time: pickRandomObject([
                      1710623973, 1710782220, 1710781251, 1710851154, 1711026187, 1710851085,
                      1709837934,
                    ]),
                    trade_type: pickRandomObject(['buy', 'buy', 'buy', 'sell']),
                  },
                  {
                    asset_name: pickRandomObject(['Genopets', 'Synesis One']),
                    amount: pickRandomObject([1, 2, 3, 4]),
                    price: 200,
                    time: pickRandomObject([
                      1710623973, 1710782220, 1710781251, 1710851154, 1711026187, 1710851085,
                      1709837934,
                    ]),
                    trade_type: pickRandomObject(['buy', 'buy', 'buy', 'sell']),
                  },
                  {
                    asset_name: pickRandomObject(['Genopets', 'Synesis One']),
                    amount: pickRandomObject([1, 2, 3, 4]),
                    price: 200,
                    time: pickRandomObject([
                      1710623973, 1710782220, 1710781251, 1710851154, 1711026187, 1710851085,
                      1709837934,
                    ]),
                    trade_type: pickRandomObject(['buy', 'buy', 'buy', 'sell']),
                  },
                  {
                    asset_name: pickRandomObject(['Genopets', 'Synesis One']),
                    amount: pickRandomObject([1, 2, 3, 4]),
                    price: 200,
                    time: pickRandomObject([
                      1710623973, 1710782220, 1710781251, 1710851154, 1711026187, 1710851085,
                      1709837934,
                    ]),
                    trade_type: pickRandomObject(['buy', 'buy', 'buy', 'sell']),
                  },
                  {
                    asset_name: pickRandomObject(['Genopets', 'Synesis One']),
                    amount: pickRandomObject([1, 2, 3, 4]),
                    price: 200,
                    time: pickRandomObject([
                      1710623973, 1710782220, 1710781251, 1710851154, 1711026187, 1710851085,
                      1709837934,
                    ]),
                    trade_type: pickRandomObject(['buy', 'buy', 'buy', 'sell']),
                  },
                  {
                    asset_name: pickRandomObject(['Genopets', 'Synesis One']),
                    amount: pickRandomObject([1, 2, 3, 4]),
                    price: 200,
                    time: pickRandomObject([
                      1710623973, 1710782220, 1710781251, 1710851154, 1711026187, 1710851085,
                      1709837934,
                    ]),
                    trade_type: pickRandomObject(['buy', 'buy', 'buy', 'sell']),
                  },
                ]
                const investorYield = [
                  {
                    asset_name: pickRandomObject(['Genopets', 'Synesis One']),
                    units: pickRandomObject([1, 2, 3, 4]),
                    time: pickRandomObject([
                      1710623973, 1710782220, 1710781251, 1710851154, 1711026187, 1710851085,
                      1709837934,
                    ]),
                  },
                  {
                    asset_name: pickRandomObject(['Genopets', 'Synesis One']),
                    units: pickRandomObject([1, 2, 3, 4]),
                    time: pickRandomObject([
                      1710623973, 1710782220, 1710781251, 1710851154, 1711026187, 1710851085,
                      1709837934,
                    ]),
                  },
                  {
                    asset_name: pickRandomObject(['Genopets', 'Synesis One']),
                    units: pickRandomObject([1, 2, 3, 4]),
                    time: pickRandomObject([
                      1710623973, 1710782220, 1710781251, 1710851154, 1711026187, 1710851085,
                      1709837934,
                    ]),
                  },
                ]
                if (createdAuthIdTxnId) {
                  setNftTxnId(createdAuthIdTxnId)
                  setNftMinted(true)
                  const userInfo = {
                    auth_id: String(authId),
                    wallet_address: `${accountAddress}`,
                    total_investments: 0,
                    registration_date_time: null,
                    last_online: null,
                    total_yield: investorYield,
                    trade_history: tradeHistory,
                    holding: null,
                    user_type: selectedUserType,
                  }
                  console.log('USER  INFO:', userInfo)
                  await createUser(userInfo)
                }
                dispatch(toggleAppLoading(false))
              }}
            >
              Mint
            </button>
          </>
        ) : (
          <>
            <p className="font-montserrat text-accent">Success! Look at your shiny new NFT</p>
            <button
              className="btn btn-accent btn-md font-montserrat text-base-100 mt-4 px-10"
              onClick={() => {
                window.open(`https://app.dappflow.org/explorer/transaction/${nftTxnId}`, '_blank')
                if (selectedUserType === 'investor' || selectedUserType === 'both') {
                  navigate('/investors')
                }
                if (selectedUserType === 'metaworker') {
                  navigate('/metaworkers')
                }
              }}
            >
              View
            </button>
          </>
        )}
      </div>
    </>
  )
}
