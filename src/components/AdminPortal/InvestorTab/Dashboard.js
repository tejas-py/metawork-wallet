import React from 'react'
import InvestorsList from './InvestorsList'
import { useNavigate } from 'react-router-dom'
import { allInvestorsTradeHistory } from '../../../backend/api'
import editUserName from '../../../assets/edit-user-name.png'
import epochToTime from '../../utils/epochToTime'
import { toggleInvestorStatus } from '../../../backend/api'
import { changeNameInvestor } from '../../../backend/api'
import TradeHistory from './TradeHistory'

export default function Dashboard() {
  const navigate = useNavigate()
  const [investorsStats, setStatsDetails] = React.useState([])
  const [investorDetail, setInvestorDetail] = React.useState([])
  const [tradeHistory, setTradeHistory] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const investorData = await InvestorsList()
      const tradeHistoryData = await allInvestorsTradeHistory()
      setStatsDetails(investorData)
      setInvestorDetail(investorData.investors)
      setTradeHistory(tradeHistoryData)
    }
    fetchData()
  }, [navigate])

  function Tooltip({ tooltip, tooltipCode }) {
    return (
      <div className="tooltip tooltip-top tooltip-accent" data-tip={tooltip}>
        {tooltipCode}
      </div>
    )
  }

  function Stats() {
    return (
      <div className="stats stats-horizontal font-montserrat shadow-md bg-white">
        <div className="stat">
          <div className="stat-title">All Investors</div>
          <div className="stat-value">{investorsStats.totalNumberOfInvestors}</div>
          <div className="stat-desc">March 19th - Present</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Investment</div>
          <div className="stat-value">{investorsStats.totalInvestments}</div>
          <div className="stat-desc text-green-500">↗︎ $400 (22%) - weekly</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Yield</div>
          <div className="stat-value">{investorsStats.totalWithdrawals}</div>
          <div className="stat-desc text-red-600">↘︎ $90 (14%) - weekly</div>
        </div>
      </div>
    )
  }

  async function handleSubmit(investorAuthId) {
    // Access the input element directly using its ID and retrieve its value
    const inputElement = document.getElementById(`investor_name_${investorAuthId}`)
    const inputValue = inputElement.value
    await changeNameInvestor(investorAuthId, inputValue)
    setInvestorDetail((currentItems) =>
      currentItems.map((item) =>
        item.auth_id === investorAuthId ? { ...item, name: inputValue } : item
      )
    )
  }

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

  function TradeHistoryPopup({ investorAuthId }) {
    const tradeHistory = [
      { asset: 'Genopets', trade_type: 'buy', amount: 10, price: 600, time: 1710623973 },
      { asset: 'Genopets', trade_type: 'sell', amount: 22, price: 1200, time: 1710623990 },
    ]
    return (
      <dialog id={`trade_history_${investorAuthId}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-montserrat text-lg text-center">TRADE HISTORY</h3>
          <TradeHistory tradeHistory={tradeHistory} />
        </div>
      </dialog>
    )
  }

  function InvestorsTable() {
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
                  ${investor.total_investments}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    <Tooltip tooltip={'Total Yield'} tooltipCode={`$${investor.total_withdrawn}`} />
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
                  <TradeHistoryPopup investorAuthId={investor.auth_id} />
                </th>
                {/* 5 */}
                <th>
                  <button
                    className="btn btn-ghost btn-xs text-red-500 font-montserrat"
                    onClick={async () => {
                      const blockData = investor.blocked ? false : true
                      await toggleInvestorStatus({
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

  return (
    <div className="flex flex-col justify-start">
      <Stats />
      <InvestorsTable />
    </div>
  )
}
