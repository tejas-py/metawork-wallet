import React from 'react'
import { userDetails } from '../../backend/api'
import SkeletonLoading from './SkeletonLoading'
import TradeHistoryPopup from './TradeHistoryPopup'
import YieldPopup from './YieldPopup'
import TableStats from './TableStats'
import getUserAssets from './userAssets'
import synesisLogo from '../../assets/assetsLogo/synesis.png'
import genopetLogo from '../../assets/assetsLogo/genopets.png'

export default function AssetsTable({ isConnectedToPeraWallet, accountAddress }) {
  const [assets, setAssets] = React.useState([])
  const [investorYield, setInvestorYield] = React.useState([])
  const [filteredAssets] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [sortConfig] = React.useState({ key: null, direction: 'ascending' })

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
    // Fetch Yield
    const fetchYield = async () => {
      if (isConnectedToPeraWallet) {
        const res = await userDetails(accountAddress)
        const allYield = res.data.total_yield
        setInvestorYield(allYield)
        console.log('DONE')
        setIsLoading(false)
      }
    }
    // Call fetchData for initial load
    fetchData()
    fetchYield()
  }, [isConnectedToPeraWallet, accountAddress, assets])

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

  function assetLogo(asset) {
    if (asset === 'Genopets') {
      return genopetLogo
    }
    if (asset === 'Synesis One') {
      return synesisLogo
    }
  }

  if (isLoading === true) {
    return <SkeletonLoading />
  }
  if (isLoading === false) {
    return (
      <div className="flex flex-col justify-center">
        <TableStats userAssets={assets} yieldHistory={investorYield} />
        <div className="overflow-x-auto relative my-20 border rounded-md shadow-md">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="font-montserrat">
                <th>Bonds</th>
                <th>Investment</th>
                <th>Yield</th>
                <th>Trade</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((asset, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-7 h-7 lg:w-16 lg:h-16">
                          <img src={assetLogo(asset.userAsset)} alt="Asset Logo" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{asset.userAsset}</div>
                        <div title="Asset Balance" className="text-sm opacity-50">
                          {asset.balance}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    ${asset.totalInvestment.toFixed(2)}
                    <br />
                    <span title="Average Asset Price" className="badge badge-ghost badge-sm">
                      ${asset.avgAssetPrice.toFixed(2)}
                    </span>
                  </td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => document.getElementById(`yield_${index}`).showModal()}
                    >
                      View
                    </button>
                    <dialog id={`yield_${index}`} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="font-montserrat text-lg text-center">Yield</h3>
                        <YieldPopup
                          yieldHistory={investorYield}
                          currentAssetName={asset.userAsset}
                        />
                      </div>
                    </dialog>
                  </th>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => document.getElementById(`trade_history_${index}`).showModal()}
                    >
                      View
                    </button>
                    <dialog id={`trade_history_${index}`} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="font-montserrat text-lg text-center">TRADE HISTORY</h3>
                        <TradeHistoryPopup userAsset={asset} />
                      </div>
                    </dialog>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
