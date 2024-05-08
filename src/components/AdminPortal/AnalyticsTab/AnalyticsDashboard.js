import React from 'react'

export default function AnalyticsDashboard() {
  function Stats() {
    return (
      <div className="stats stats-horizontal font-montserrat shadow-md bg-white w-screen text-xs lg:text-xl">
        <div className="stat">
          <div className="stat-title">Active Users Monthly</div>
          <div className="stat-value">12</div>
          <div className="stat-desc">March 19th - Present</div>
        </div>

        <div className="stat">
          <div className="stat-title">Active Users Weekly</div>
          <div className="stat-value">123</div>
          <div className="stat-desc">March 19th - Present</div>
        </div>

        <div className="stat">
          <div className="stat-title">Active Users Daily</div>
          <div className="stat-value">123</div>
          <div className="stat-desc">March 19th - Present</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-start">
      <Stats />
    </div>
  )
}
