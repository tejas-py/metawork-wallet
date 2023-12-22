import React from 'react'
import './assets.css'

export default function TradeHistoryPopup({ asset, onClose }) {
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

  const sortedTradeHistory = asset.tradeHistory
    .slice() // Create a shallow copy
    .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp))

  console.log('sorted data:', sortedTradeHistory)

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-table-container">
          <table>
            <caption>Trade History for {asset.userAsset}</caption>
            <thead>
              <tr>
                <th>Type</th>
                <th>Units</th>
                <th>Price/Asset</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {asset.tradeHistory
                .slice() // Create a shallow copy of the array
                .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)) // Sort based on converted timeStamp
                .map((trade, index) => (
                  <tr key={index}>
                    <td>{trade.tradeType}</td>
                    <td>{trade.units}</td>
                    <td>${trade.pricePerAsset}</td>
                    <td>{unixToTime(trade.timeStamp)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  )
}
