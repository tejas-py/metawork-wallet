import { indexer } from '../blockchain/algodClient'

export async function checkAuthToken(walletAddress) {
  try {
    // Get the account info
    const indexerClient = await indexer()
    const accountInfo = await indexerClient.lookupAccountByID(walletAddress).do()
    const assets = accountInfo.account.assets

    // Check the total number of assets
    let totalAssets
    if (assets.length) {
      totalAssets = assets.length
    } else {
      totalAssets = 0
      return false
    }
    let notAuthToken = 0

    // Get the assets info
    for (let asset of assets) {
      const assetId = asset['asset-id']
      const assetInfo = await indexerClient.lookupAssetByID(assetId).do()

      // Asset params
      const assetName = assetInfo.asset.params.name
      const assetSymbol = assetInfo.asset.params['unit-name']
      const createdAddress = assetInfo.asset.params.creator
      const clawbackAddress = assetInfo.asset.params.clawback
      const decimals = assetInfo.asset.params.decimals
      const defaultFrozen = assetInfo.asset.params['default-frozen']
      const amount = assetInfo.asset.params.total

      // All the auth token conditions
      const metaWorkAddress = 'IXQXUPYYLCQIOYSVNLGKVC7PANRHLHKOML5HACB6EM7GM4GM4S6ZTEFECY'
      const authTokenConditions =
        assetName === 'METAWORK-AUTH-TOKEN' &&
        assetSymbol === 'MAT' &&
        createdAddress === walletAddress &&
        clawbackAddress === metaWorkAddress &&
        decimals === 0 &&
        defaultFrozen === true &&
        amount === 1

      // If conditions are met return true
      if (authTokenConditions) {
        return true
      } else {
        notAuthToken++
        if (notAuthToken === totalAssets) {
          return false
        }
      }
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function authTokenInfo(walletAddress) {
  try {
    const indexerClient = await indexer()
    // Get the account info
    const accountInfo = await indexerClient.lookupAccountByID(walletAddress).do()
    const assets = accountInfo.account.assets

    // Check the total number of assets
    const totalAssets = assets.length
    let notAuthToken = 0

    // Get the assets info
    for (let asset of assets) {
      const assetId = asset['asset-id']
      const assetInfo = await indexerClient.lookupAssetByID(assetId).do()

      // Asset params
      const assetName = assetInfo.asset.params.name
      const assetSymbol = assetInfo.asset.params['unit-name']
      const createdAddress = assetInfo.asset.params.creator
      const clawbackAddress = assetInfo.asset.params.clawback
      const decimals = assetInfo.asset.params.decimals
      const defaultFrozen = assetInfo.asset.params['default-frozen']
      const amount = assetInfo.asset.params.total

      // All the auth token conditions
      const metaWorkAddress = process.env.METAWORK_ADDRESS
      const authTokenConditions =
        assetName === 'METAWORK-AUTH-TOKEN' &&
        assetSymbol === 'MAT' &&
        createdAddress === walletAddress &&
        clawbackAddress === metaWorkAddress &&
        decimals === 0 &&
        defaultFrozen === true &&
        amount === 1

      // If conditions are met return true
      if (authTokenConditions) {
        return {
          assetName,
          assetSymbol,
          assetId,
        }
      } else {
        notAuthToken++
        if (notAuthToken === totalAssets) {
          return false
        }
      }
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}
