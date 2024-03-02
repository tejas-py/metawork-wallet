import React, { useState } from 'react'
import './adminPortal.css'

export default function AdminTab() {
  const [activeTab, setActiveTab] = useState('tab1')

  const handleTabChange = (e) => {
    setActiveTab(e.target.id)
  }

  return (
    <div className="popup">
      <div className="tabs">
        {Array.from({ length: 6 }, (_, i) => {
          const tabNumber = i + 1
          const tabLabels = ['Assets', 'Investors', 'Disburse', 'Analytics', 'Settings', 'Wallets']
          const tabId = `tab${tabNumber}`
          return (
            <React.Fragment key={tabId}>
              <input
                type="radio"
                id={tabId}
                name="tab"
                checked={activeTab === tabId}
                onChange={handleTabChange}
              />
              <label htmlFor={tabId}>{`${tabLabels[i]}`}</label>
            </React.Fragment>
          )
        })}
        <div className="marker">
          <div id="top"></div>
          <div id="bottom"></div>
        </div>
      </div>
    </div>
  )
}
