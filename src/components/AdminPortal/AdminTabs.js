import React, { useState } from 'react'
import Dashboard from './InvestorTab/Dashboard'
import '../../app.css'

export default function AdminTab() {
  // State to manage the selected tab, defaulting to the tab you want to be selected on initial render
  const [selectedTab, setSelectedTab] = useState('Investors')

  return (
    <div role="tablist" className="tabs tabs-lifted relative top-24 mx-6 mb-11">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Assets"
        checked={selectedTab === 'Assets'}
        onChange={() => setSelectedTab('Assets')}
      />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        Tab content 1
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Investors"
        checked={selectedTab === 'Investors'}
        onChange={() => setSelectedTab('Investors')}
      />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <Dashboard />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Disburse"
        checked={selectedTab === 'Disburse'}
        onChange={() => setSelectedTab('Disburse')}
      />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        Tab content 3
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Analytics"
        checked={selectedTab === 'Analytics'}
        onChange={() => setSelectedTab('Analytics')}
      />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        Tab content 4
      </div>
    </div>
  )
}
