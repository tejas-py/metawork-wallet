import React from 'react'
import './assets.css'

export default function TradeHistoryPopup({ asset, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Trade History for {asset.userAsset}</h2>
        <ul>
          {asset.tradeHistory.map((trade, index) => (
            <li key={index}>
              <p>Price/Asset: {trade.pricePerAsset}</p>
              <p>Time: {trade.timeStamp}</p>
              <p>Trade Type:{trade.tradeType}</p>
              <p>Units: {trade.units}</p>
            </li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
