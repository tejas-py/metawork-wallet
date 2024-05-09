import { userDetails } from '../../backend/api.js'

function unixConverter(timestamp) {
  const date = new Date(timestamp)
  const unixTimestamp = date.getTime() / 1000
  return unixTimestamp
}

function calculateBalanceAvgPrice(tradeHistory) {
  tradeHistory.forEach((trade) => {
    trade.timeStamp = unixConverter(trade.timeStamp)
  })

  // sort the trade history buy the time
  const sortedTradeHistory = tradeHistory.sort((a, b) => a.timeStamp - b.timeStamp)

  // caluclate balance and the average asset price
  let balance = 0.0
  let avgAssetPrice = 0.0
  sortedTradeHistory.forEach((trade) => {
    if (trade.tradeType === 'buy') {
      if (balance === 0.0) {
        balance = trade.units
        avgAssetPrice = (trade.pricePerAsset * trade.units) / balance
      } else {
        const newBuyBalance = balance + trade.units
        const tradeAmount = trade.pricePerAsset * trade.units
        avgAssetPrice = (avgAssetPrice * balance + tradeAmount) / newBuyBalance
        balance = newBuyBalance
      }
    } else if (trade.tradeType === 'sell') {
      const newSellBalance = balance - trade.units
      if (newSellBalance === 0.0) {
        avgAssetPrice = 0.0
      } else {
        avgAssetPrice = (avgAssetPrice * balance - avgAssetPrice * trade.units) / newSellBalance
      }
      balance = newSellBalance
    }
  })

  // return the balance and avg asset price
  return [balance, avgAssetPrice]
}

export default async function getUserAssets(accountAddress) {
  const investorInfoRes = await userDetails(accountAddress)

  const investorTrade = investorInfoRes.data.trade_history
  let trades = { 'Synesis One': [], 'Genopets': [] }

  investorTrade.forEach((trade) => {
    const assetName = trade.asset_name
    if (assetName === 'Synesis One') {
      const oneTrade = {
        pricePerAsset: trade.price,
        timeStamp: trade.time,
        tradeType: trade.trade_type,
        units: trade.amount,
      }
      trades['Synesis One'].push(oneTrade)
    }
    if (assetName === 'Genopets') {
      const oneTrade = {
        pricePerAsset: trade.price,
        timeStamp: trade.time,
        tradeType: trade.trade_type,
        units: trade.amount,
      }
      trades.Genopets.push(oneTrade)
    }
  })

  const userAssets = Object.keys(trades)
  const NumberOfAssets = userAssets.length
  let assets = []
  for (let i = 0; i < NumberOfAssets; i++) {
    const tradeHistory = trades[userAssets[i]]
    const [balance, avgAssetPrice] = calculateBalanceAvgPrice(tradeHistory)

    const userAssetData = {
      userAsset: userAssets[i],
      balance,
      totalInvestment: balance * avgAssetPrice,
      avgAssetPrice,
      tradeHistory,
    }
    assets.push(userAssetData)
  }
  return assets
}
