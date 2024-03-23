import React from 'react'

export default function YieldPopup({ yieldHistory, currentAssetName }) {
  function assetYield() {
    const assetYieldHistory = []
    yieldHistory.forEach((history) => {
      if (history.asset_name === currentAssetName) {
        assetYieldHistory.push({
          time: [history.time],
          units: [history.units],
        })
      }
    })
    return assetYieldHistory
  }

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
            <th>Time</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {assetYield()
            .slice() // Create a shallow copy of the array
            .sort((a, b) => new Date(a.time) - new Date(b.time)) // Sort based on converted timeStamp
            .map((history, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{unixToTime(history.time)}</td>
                <td>${history.units}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
