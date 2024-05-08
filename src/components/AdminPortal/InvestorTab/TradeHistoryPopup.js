import React from 'react'

function TradeHistory({ tradeHistory }) {
  function unixToTime(unixTime) {
    const date = new Date(unixTime * 1000)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    // Hours part from the timestamp
    const hours = date.getHours()
    // Minutes part from the timestamp
    const minutes = '0' + date.getMinutes()
    // Seconds part from the timestamp
    const seconds = '0' + date.getSeconds()
    // Will display time in 10:30:23 format
    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(
      -2
    )}`
    return formattedTime
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs lg:table-md">
        <thead>
          <tr>
            <th></th>
            <th>Asset Name</th>
            <th>Type</th>
            <th>Units</th>
            <th>Price/Asset</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {tradeHistory
            .slice() // Create a shallow copy of the array
            .sort((a, b) => new Date(a.time) - new Date(b.time)) // Sort based on converted timeStamp
            .map((trade, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <th>{trade.asset}</th>
                <td>{trade.trade_type}</td>
                <td>{trade.amount}</td>
                <td>${trade.price}</td>
                <td>{unixToTime(trade.time)}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Asset Name</th>
            <th>Type</th>
            <th>Units</th>
            <th>Price/Asset</th>
            <th>Time</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default function TradeHistoryPopup({ tradeHistory, investorAuthId }) {
  const tradeHistoryByInvestor = tradeHistory[investorAuthId]
  return (
    <dialog id={`trade_history_${investorAuthId}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-montserrat text-lg text-center">TRADE HISTORY</h3>
        <TradeHistory tradeHistory={tradeHistoryByInvestor} />
      </div>
    </dialog>
  )
}
