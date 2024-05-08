import React, { useState } from 'react'
import AssetsTable from './AssetsTable'
import MetaWorkerAnalytics from './MetaworkerAnalytics'
import ThemeSelector from './SettingsTab/ThemeSelector'

export default function MetaWorkersTab({ isConnectedToPeraWallet, accountAddress }) {
  // State to manage the selected tab, defaulting to the tab you want to be selected on initial render
  const [selectedTab, setSelectedTab] = useState('Dashboard')

  return (
    <div role="tablist" className="tabs tabs-lifted relative top-24 w-screen mb-11">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Market"
        checked={selectedTab === 'Market'}
        onChange={() => setSelectedTab('Market')}
      />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        Market tab Content
      </div>
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Dashboard"
        checked={selectedTab === 'Dashboard'}
        onChange={() => setSelectedTab('Dashboard')}
      />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <AssetsTable
          isConnectedToPeraWallet={isConnectedToPeraWallet}
          accountAddress={accountAddress}
        />
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
        <MetaWorkerAnalytics />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Settings"
        checked={selectedTab === 'Settings'}
        onChange={() => setSelectedTab('Settings')}
      />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <ThemeSelector />
      </div>
    </div>
  )
}
