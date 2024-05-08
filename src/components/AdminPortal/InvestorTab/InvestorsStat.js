import React from 'react'

export default function InvestorStat({
  tradeHistory,
  investorData,
  calculateUserInvestment,
  calculateUserYield,
  investorsYield,
}) {
  function calculateTotalInvestment() {
    const allAuthId = Object.keys(tradeHistory)

    let totalInvestment = 0
    allAuthId.forEach((auth_id) => {
      const investment = +calculateUserInvestment(tradeHistory, auth_id)
      totalInvestment += investment
    })
    return totalInvestment.toFixed(0)
  }

  function calculateTotalYield() {
    const allAuthId = Object.keys(tradeHistory)

    let totalYield = 0
    allAuthId.forEach((auth_id) => {
      const investment = +calculateUserYield(investorsYield, auth_id)
      totalYield += investment
    })
    return totalYield.toFixed(0)
  }

  return (
    <div className="stats stats-horizontal font-montserrat shadow-md bg-white w-screen text-xs lg:text-xl">
      <div className="stat">
        <div className="stat-title">All Investors</div>
        <div className="stat-value">{investorData.totalNumberOfInvestors}</div>
        <div className="stat-desc">March 19th - Present</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Investment</div>
        <div className="stat-value">${calculateTotalInvestment()}</div>
        <div className="stat-desc text-green-500">↗︎ $400 (22%) - weekly</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Yield</div>
        <div className="stat-value">${calculateTotalYield()}</div>
        <div className="stat-desc text-red-600">↘︎ $90 (14%) - weekly</div>
      </div>
    </div>
  )
}
