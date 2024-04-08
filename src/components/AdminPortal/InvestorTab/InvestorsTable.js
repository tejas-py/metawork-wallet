import React from 'react'
import editUserName from '../../../assets/edit-user-name.png'
import epochToTime from '../../utils/epochToTime'
import TradeHistoryPopup from './TradeHistoryPopup'
import { toggleUserStatus } from '../../../backend/api'
import { changeNameUser } from '../../../backend/api'

export function calculateUserInvestment(tradeHistory, investorAuthId) {
  const allTrades = tradeHistory[investorAuthId]

  // sort the trade history buy the time
  const sortedTradeHistory = allTrades.sort((a, b) => a.time - b.time)

  // caluclate balance and the average asset price
  let balance = 0.0
  let avgAssetPrice = 0.0
  sortedTradeHistory.forEach((trade) => {
    if (trade.trade_type === 'buy') {
      if (balance === 0.0) {
        balance = trade.amount
        avgAssetPrice = (trade.price * trade.amount) / balance
      } else {
        const newBuyBalance = balance + trade.amount
        const tradeAmount = trade.price * trade.amount
        avgAssetPrice = (avgAssetPrice * balance + tradeAmount) / newBuyBalance
        balance = newBuyBalance
      }
    } else if (trade.trade_type === 'sell') {
      const newSellBalance = balance - trade.amount
      if (newSellBalance === 0.0) {
        avgAssetPrice = 0.0
      } else {
        avgAssetPrice = (avgAssetPrice * balance - avgAssetPrice * trade.amount) / newSellBalance
      }
      balance = newSellBalance
    }
  })
  const totalInvestment = balance * avgAssetPrice
  return totalInvestment.toFixed(1)
}

export function calculateUserYield(investorsYield, investorAuthId) {
  const yieldHistory = investorsYield[investorAuthId]

  let userYield = 0
  yieldHistory.forEach((history) => {
    const yieldAmount = +history.amount
    userYield += yieldAmount
  })
  return userYield
}

export function InvestorsTable({
  investorDetail,
  tradeHistory,
  setInvestorDetail,
  investorsYield,
}) {
  function EditInvestorName({ investorAuthId, investorName }) {
    return (
      <dialog id={`edit_investor_${investorAuthId}`} className="modal modal-middle">
        <div className="modal-box w-80">
          <h3 className="font-bold text-lg">Edit Name!</h3>
          <div className="modal-action">
            <form
              method="dialog"
              onSubmit={async () => {
                await handleSubmit(investorAuthId)
              }}
            >
              <input
                type="text"
                placeholder={`investor_name_${investorAuthId}`}
                id={`investor_name_${investorAuthId}`}
                className="input input-bordered w-full max-w-xs mb-6"
                maxLength="18"
                defaultValue={investorName}
              />
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-accent text-base-100 hover:bg-secondary">Submit</button>
            </form>
          </div>
        </div>
      </dialog>
    )
  }

  async function handleSubmit(investorAuthId) {
    // Access the input element directly using its ID and retrieve its value
    const inputElement = document.getElementById(`investor_name_${investorAuthId}`)
    const inputValue = inputElement.value
    await changeNameUser(investorAuthId, inputValue)
    setInvestorDetail((currentItems) =>
      currentItems.map((item) =>
        item.auth_id === investorAuthId ? { ...item, name: inputValue } : item
      )
    )
  }

  function Tooltip({ tooltip, tooltipCode }) {
    return (
      <div className="tooltip tooltip-top tooltip-accent" data-tip={tooltip}>
        {tooltipCode}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border rounded-md shadow-lg mt-12">
      <table className="table">
        {/* head */}
        <thead className="font-montserrat">
          <tr>
            <th>Name</th>
            <th>Total Invested</th>
            <th>Last Online</th>
            <th>Trade History</th>
            <th>Block/Unblock</th>
          </tr>
        </thead>
        <tbody>
          {investorDetail.map((investor, index) => (
            <tr key={index}>
              {/* 1 */}
              <td>
                <div className="flex items-center gap-3">
                  <div
                    className="avatar hover:cursor-pointer"
                    onClick={() => {
                      document.getElementById(`edit_investor_${investor.auth_id}`).showModal()
                    }}
                  >
                    <EditInvestorName
                      investorAuthId={investor.auth_id}
                      investorName={investor.name}
                    />
                    <div className="mask mask-squircle w-5 h-5">
                      <img src={editUserName} alt="Edit User Name" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{investor.name}</div>
                    <div className="text-sm opacity-50 font-montserrat">
                      {investor.wallet_address.slice(0, 8) + '...'}
                    </div>
                  </div>
                </div>
              </td>
              {/* 2 */}
              <td>
                ${calculateUserInvestment(tradeHistory, investor.auth_id)}
                <br />
                <span className="badge badge-ghost badge-sm">
                  <Tooltip
                    tooltip={'Total Yield'}
                    tooltipCode={`$${calculateUserYield(investorsYield, investor.auth_id)}`}
                  />
                </span>
              </td>
              {/* 3 */}
              <td>
                {epochToTime(investor.last_online)}
                <br />
                <span className="badge badge-ghost badge-sm">
                  <Tooltip
                    tooltip={'Registration Time'}
                    tooltipCode={epochToTime(investor.registration_date_time)}
                  />
                </span>
              </td>
              {/* 4 */}
              <th>
                <button
                  className="btn btn-ghost btn-xs font-montserrat"
                  onClick={() =>
                    document.getElementById(`trade_history_${investor.auth_id}`).showModal()
                  }
                >
                  View
                </button>
                <TradeHistoryPopup tradeHistory={tradeHistory} investorAuthId={investor.auth_id} />
              </th>
              {/* 5 */}
              <th>
                <button
                  className="btn btn-ghost btn-xs text-red-500 font-montserrat"
                  onClick={async () => {
                    const blockData = investor.blocked ? false : true
                    await toggleUserStatus({
                      auth_id: investor.auth_id,
                      block: blockData,
                    })
                    setInvestorDetail((currentItems) =>
                      currentItems.map((item) =>
                        item.auth_id === investor.auth_id ? { ...item, blocked: blockData } : item
                      )
                    )
                  }}
                >
                  {investor.blocked ? 'Unblock' : 'Block'}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
