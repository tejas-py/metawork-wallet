import React from 'react'
import TradeHistoryPopup from './TradeHistoryPopup'
import getUserAssets from './userAssets'
import './assets.css'

export default function AssetsTable({ isConnectedToPeraWallet, accountAddress }) {
  const [assets, setAssets] = React.useState([])
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)
  const [selectedAsset, setSelectedAsset] = React.useState(null)

  React.useEffect(() => {
    async function fetchData() {
      if (isConnectedToPeraWallet) {
        try {
          const data = await getUserAssets(accountAddress)
          setAssets(data)
        } catch (error) {
          console.error('Error fetching assets:', error)
        }
      }
    }
    fetchData()
  }, [isConnectedToPeraWallet, accountAddress])

  const handleViewClick = (asset) => {
    setSelectedAsset(asset)
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setSelectedAsset(null)
  }

  return (
    <div className="table-container">
      <table>
        {/* This could be dynamic as well */}
        <caption>Total Earnings: $564.34</caption>
        <thead>
          <tr>
            <th>Asset</th>
            <th>PRICE</th>
            <th>Balance</th>
            <th>Total Investment</th>
            <th>Avg Asset Price</th>
            <th>Profit</th>
            <th>Trade History</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={index}>
              <td>{asset.userAsset}</td>
              <td>${(1 / asset.assetPrice).toFixed(6)}</td>
              <td>{asset.balance}</td>
              <td>${asset.totalInvestment.toFixed(2)}</td>
              <td>${asset.avgAssetPrice.toFixed(2)}</td>
              <td>${((1 / asset.assetPrice - asset.avgAssetPrice) * asset.balance).toFixed(3)}</td>
              <td>
                <button className="view-button" onClick={() => handleViewClick(asset)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && <TradeHistoryPopup asset={selectedAsset} onClose={handleClosePopup} />}
    </div>
  )
}
