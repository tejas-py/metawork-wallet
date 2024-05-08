import React from 'react'
import InvestorsList from './InvestorsList'
import { useNavigate } from 'react-router-dom'
import { allInvestorsTradeHistory } from '../../../backend/api'
import InvestorStat from './InvestorsStat'
import SkeletonLoading from './SkeletonLoading'
import { calculateUserInvestment, calculateUserYield, InvestorsTable } from './InvestorsTable'
import { allInvestorsTotalYield } from '../../../backend/api'

export default function InvestorDashboard() {
  const navigate = useNavigate()
  const [investorsStats, setStatsDetails] = React.useState([])
  const [investorDetail, setInvestorDetail] = React.useState([])
  const [tradeHistory, setTradeHistory] = React.useState([])
  const [investorsYield, setInvestorsYield] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      const investorData = await InvestorsList()
      setStatsDetails(investorData)
      setInvestorDetail(investorData.investors)
    }

    const fetchTrade = async () => {
      const res = await allInvestorsTradeHistory()
      const allInvestorsTrades = res.data.message
      const allAuthId = {}

      allInvestorsTrades.forEach((trade) => {
        // Check if the investor_id already exists in allAuthId
        if (!allAuthId.hasOwnProperty(trade.user_id)) {
          // If not, initialize it with an empty array
          allAuthId[trade.user_id] = []
        }

        if (allAuthId.hasOwnProperty(trade.user_id)) {
          if (allAuthId[trade.user_id].length === 0) {
            allAuthId[trade.user_id] = [
              {
                asset: trade.asset_name,
                price: trade.price,
                time: trade.time,
                trade_type: trade.trade_type,
                amount: trade.amount,
              },
            ]
          }
          if (allAuthId[trade.user_id].length >= 1) {
            const indexNumber = allAuthId[trade.user_id].length
            allAuthId[trade.user_id].splice(indexNumber, 0, {
              asset: trade.asset_name,
              price: trade.price,
              time: trade.time,
              trade_type: trade.trade_type,
              amount: trade.amount,
            })
          }
        }
      })
      setTradeHistory(allAuthId)
    }

    const fetchYield = async () => {
      const res = await allInvestorsTotalYield()
      const allInvestorsYield = res.data.message

      const allAuthId = {}
      allInvestorsYield.forEach((trade) => {
        // Check if the investor_id already exists in allAuthId
        if (!allAuthId.hasOwnProperty(trade.user_id)) {
          // If not, initialize it with an empty array
          allAuthId[trade.user_id] = []
        }

        if (allAuthId.hasOwnProperty(trade.user_id)) {
          if (allAuthId[trade.user_id].length === 0) {
            allAuthId[trade.user_id] = [
              {
                asset: trade.asset_name,
                amount: trade.units,
                time: trade.time,
              },
            ]
          }
          if (allAuthId[trade.user_id].length >= 1) {
            const indexNumber = allAuthId[trade.user_id].length
            allAuthId[trade.user_id].splice(indexNumber, 0, {
              asset: trade.asset_name,
              amount: trade.units,
              time: trade.time,
            })
          }
        }
      })
      setInvestorsYield(allAuthId)
      setIsLoading(false)
    }
    fetchData()
    fetchTrade()
    fetchYield()
  }, [navigate])

  if (isLoading === true) {
    return <SkeletonLoading />
  }
  if (isLoading === false) {
    return (
      <div className="flex flex-col justify-start">
        <InvestorStat
          tradeHistory={tradeHistory}
          investorData={investorsStats}
          calculateUserInvestment={calculateUserInvestment}
          calculateUserYield={calculateUserYield}
          investorsYield={investorsYield}
        />
        <InvestorsTable
          investorDetail={investorDetail}
          tradeHistory={tradeHistory}
          setInvestorDetail={setInvestorDetail}
          investorsYield={investorsYield}
        />
      </div>
    )
  }
}
