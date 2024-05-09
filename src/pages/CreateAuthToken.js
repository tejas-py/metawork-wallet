import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { toggleAppLoading } from '../store/slices/LoadinAndNotifSlice.js'
import MintMyNFT from '../components/CreateAuthToken/MintMyNFT.js'
import { authTokenInfo } from '../blockchain/accounts.js'
import { userDetails, createUser } from '../backend/api.js'
import PeraWallet from '../components/PeraWallet/PeraWallet.js'
import NavBar from '../components/NavBar/NavBar.js'
import { validateAddress } from '../blockchain/solana/validateAddress.js'

export default function CreateAuthToken() {
  const [peraWallet, accountAddress, isConnectedToPeraWallet, handleConnectWalletClick] =
    PeraWallet()
  const [nftMinted, setNftMinted] = React.useState(false)
  const [nftTxnId, setNftTxnId] = React.useState('')
  const [selectedUserType, setSelectedUserType] = React.useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const DividendWalletForm = useForm()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = DividendWalletForm

  function UserDividendWalletAddress() {
    return (
      <label
        htmlFor="dividend_wallet_address"
        className="relative input input-accent input-bordered text-neutral flex items-center gap-2 my-2 w-full max-w-xs left-1/2 -translate-x-1/2"
      >
        Wallet
        <input
          type="text"
          className="grow"
          placeholder="Dividend Wallet Address"
          id="dividend_wallet_address"
          {...register('dividend_wallet_address', {
            required: true,
            minLength: 32,
            maxLength: 44,
            validate: (fieldValue) => {
              const isCorrect = validateAddress(fieldValue)
              return isCorrect || 'The Wallet Address is not verified'
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: 'Invalid Wallet Address Format',
            },
          })}
        />
      </label>
    )
  }

  function UserTypeForm() {
    return (
      <label
        htmlFor="usertype"
        className="relative form-control my-2 w-full max-w-xs left-1/2 -translate-x-1/2"
      >
        <select
          className="select select-accent text-neutral"
          defaultValue={selectedUserType}
          id="usertype"
          {...register('usertype', { required: true })}
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

  async function onMint(data) {
    dispatch(toggleAppLoading(true))
    const createdAuthIdTxnId = await MintMyNFT(peraWallet, accountAddress)
    const authId = await authTokenInfo(accountAddress)

    if (createdAuthIdTxnId && authId) {
      setNftTxnId(createdAuthIdTxnId)
      setNftMinted(true)
      const userInfo = {
        auth_id: String(authId),
        wallet_address: `${accountAddress}`,
        total_investments: 0,
        registration_date_time: null,
        last_online: null,
        total_yield: null,
        trade_history: null,
        dividend_wallet: data.divident_wallet_address,
        user_type: data.usertype,
      }
      await createUser(userInfo)
      setSelectedUserType(data.usertype)
    }
    dispatch(toggleAppLoading(false))
  }

  return (
    <>
      <NavBar
        accountAddress={accountAddress}
        isConnectedToPeraWallet={isConnectedToPeraWallet}
        handleDisconnectWalletClick={handleConnectWalletClick}
      />
      <div className="fixed bg-base-100 border border-neutral rounded-2xl shadow p-9 text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {!nftMinted ? (
          <>
            <p className="font-montserrat text-accent text-xl">
              This will create your own personalized NFT for the platform. You will then use this
              NFT login to the system.
            </p>
            <form onSubmit={handleSubmit(onMint)} noValidate>
              <UserTypeForm />
              <UserDividendWalletAddress />
              <p className="text-error">{errors.dividend_wallet_address?.message}</p>
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-accent btn-md font-montserrat text-base-100 px-10 mt-2"
              >
                Mint
              </button>
            </form>
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
      <DevTool control={control} />
    </>
  )
}
