import React from 'react'

export default function WLBCard() {
  return (
    <div className="stats bg-info text-neutral flex justify-center">
      <div className="stat">
        <div className="stat-title">WLBs Available to Buy</div>
        <div className="stat-value">2</div>
        <div className="stat-actions">
          <button className="btn btn-sm btn-accent text-base-100">Buy</button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Current WLBs</div>
        <div className="stat-value">10</div>
        <div className="stat-actions">
          <button className="btn btn-sm btn-accent bg-base-100 text-accent hover:text-base-100">
            Sell
          </button>
          <button className="btn btn-sm btn-accent bg-base-100 text-accent hover:text-base-100 mx-1">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
