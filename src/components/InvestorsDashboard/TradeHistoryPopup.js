import React from 'react'

export default function TradeHistoryPopup({ userAsset }) {
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
            <th>Type</th>
            <th>Units</th>
            <th>Price/Asset</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {userAsset.tradeHistory
            .slice() // Create a shallow copy of the array
            .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)) // Sort based on converted timeStamp
            .map((trade, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{trade.tradeType}</td>
                <td>{trade.units}</td>
                <td>${trade.pricePerAsset}</td>
                <td>{unixToTime(trade.timeStamp)}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
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
