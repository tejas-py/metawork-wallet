import React from 'react'
import { userDetails } from '../../backend/api'
import TableStats from './TableStats'
import getUserAssets from './userAssets'
import synesisLogo from '../../assets/assetsLogo/synesis.png'
import genopetLogo from '../../assets/assetsLogo/genopets.png'

export default function AssetsTable({ isConnectedToPeraWallet, accountAddress }) {
  const [assets, setAssets] = React.useState([])
  const [investorYield, setInvestorYield] = React.useState([])
  const [filteredAssets] = React.useState([])
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

  return (
    <div className="flex flex-col justify-start">
      <TableStats />
      <div className="overflow-x-auto relative my-20 border rounded-md shadow-md">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-montserrat">
              <th>Projects</th>
              <th>Registration Date</th>
              <th>Dividend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-7 h-7 lg:w-16 lg:h-16">
                      <img src={assetLogo('Genopets')} alt="Asset Logo" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Genopets</div>
                  </div>
                </div>
              </td>
              <td>12/01/2024</td>
              {/* 3 */}
              <th>
                <button className="btn btn-ghost btn-xs">View</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
