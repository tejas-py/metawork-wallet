import React from 'react'
import './WalletAddressButton.css'
import { useNavigate } from 'react-router-dom'

export default function WalletAddressButton({
  accountAddress,
  isConnectedToPeraWallet,
  handleDisconnectWalletClick,
}) {
  const navigate = useNavigate()
  const [isHovering, setIsHovering] = React.useState(false)

  const hoverText = isConnectedToPeraWallet ? accountAddress : 'Wallet not connected'
  const buttonText = isConnectedToPeraWallet
    ? isHovering
      ? 'Disconnect'
      : `${accountAddress.slice(0, 8)}...`
    : 'Disconnect'

  async function handleClick() {
    if (isConnectedToPeraWallet) {
      handleDisconnectWalletClick()
      navigate('/')
    }
  }

  return (
    <button
      disabled={!isConnectedToPeraWallet}
      className="wallet-button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      title={hoverText}
    >
      {buttonText}
    </button>
  )
}
