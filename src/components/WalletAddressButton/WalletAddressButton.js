import React from 'react'
import './WalletAddressButton.css'

export default function WalletAddressButton({
  isConnectedToPeraWallet,
  walletAddress,
  handleDisconnectWalletClick,
}) {
  const [isHovering, setIsHovering] = React.useState(false)

  const hoverText = isConnectedToPeraWallet ? walletAddress : 'Wallet not connected'
  const buttonText = isConnectedToPeraWallet
    ? isHovering
      ? 'Disconnect'
      : `${walletAddress.slice(0, 10)}...`
    : 'Disconnect'

  return (
    <button
      disabled={!isConnectedToPeraWallet}
      className="wallet-button"
      onClick={isConnectedToPeraWallet ? handleDisconnectWalletClick : null}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      title={hoverText}
    >
      {buttonText}
    </button>
  )
}
