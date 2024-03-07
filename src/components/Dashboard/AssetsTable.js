import React from 'react'
import TradeHistoryPopup from './TradeHistoryPopup'
import getUserAssets from './userAssets'
import './assets.css'

export default function AssetsTable({ isConnectedToPeraWallet, accountAddress }) {
  const [assets, setAssets] = React.useState([])
  const [filteredAssets, setFilteredAssets] = React.useState([])
  const [uniqueAssets, setUniqueAssets] = React.useState([])
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)
  const [selectedAsset, setSelectedAsset] = React.useState(null)
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'ascending' })

  React.useEffect(() => {
    // Function to fetch user assets
    const fetchData = async () => {
      if (isConnectedToPeraWallet) {
        try {
          const data = await getUserAssets(accountAddress)
          setAssets(data)
        } catch (error) {
          console.log('Error fetching assets:', error)
        }
      }
    }
    // Call fetchData for initial load
    fetchData()

    // Asset selection
    const assetTypes = Array.from(new Set(assets.map((asset) => asset.userAsset)))
    setUniqueAssets(assetTypes)
  }, [isConnectedToPeraWallet, accountAddress, assets])

  // Handle change event of select
  const handleFilterChange = (event) => {
    const selectedAsset = event.target.value
    if (selectedAsset) {
      setFilteredAssets(assets.filter((asset) => asset.userAsset === selectedAsset))
    } else {
      setFilteredAssets(assets)
    }
  }

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...assets]
    if (filteredAssets.length > 0) {
      sortableItems = [...filteredAssets]
    }
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [assets, filteredAssets, sortConfig])

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  function totalInvestment() {
    let investment = 0
    for (let i = 0, l = assets.length; i < l; i++) {
      const assetInvestment = assets[i].totalInvestment
      investment += assetInvestment
    }
    return investment
  }

  return (
    <div className="table-container">
      <table>
        <caption>
          <div className="caption-flex">
            <p>
              Total Investment<h3>${totalInvestment().toFixed(2)}</h3>
            </p>
            <p>
              Total Yield<h3>$0</h3>
            </p>
          </div>
        </caption>
        <thead>
          <tr>
            <th>
              <select onChange={handleFilterChange} className="asset-select">
                <option value="">All Assets</option>
                {uniqueAssets.map((asset, index) => (
                  <option key={index} value={asset}>
                    {asset}
                  </option>
                ))}
              </select>
            </th>
            <th className="sort-indicator" onClick={() => requestSort('balance')}>
              Balance
            </th>
            <th className="sort-indicator" onClick={() => requestSort('totalInvestment')}>
              Investment
            </th>
            <th className="sort-indicator" onClick={() => requestSort('avgAssetPrice')}>
              Avg Price
            </th>
            <th>Yield</th>
            <th>Trade History</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((asset, index) => (
            <tr key={index}>
              <td>{asset.userAsset}</td>
              <td>{asset.balance}</td>
              <td>${asset.totalInvestment.toFixed(2)}</td>
              <td>${asset.avgAssetPrice.toFixed(2)}</td>
              <td>N/A</td>
              <td>
                <button
                  className="view-button"
                  onClick={() => {
                    setSelectedAsset(asset)
                    setIsPopupOpen(true)
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && (
        <TradeHistoryPopup
          asset={selectedAsset}
          onClose={() => {
            setIsPopupOpen(false)
            setSelectedAsset(null)
          }}
        />
      )}
    </div>
  )
}
