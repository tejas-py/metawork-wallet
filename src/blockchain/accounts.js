import { indexer } from '../blockchain/algodClient.js'

export async function checkAuthToken(walletAddress) {
  try {
    // define the admin wallet address
    const admin_wallet_address = '34XRFBWVM2HGSVOVNKLCYJBLWUUY3YJ2PCIHKAF4E7AXFBYGJR65H5XD6E'
    // Get the account info
    const indexerClient = await indexer()
    const accountInfo = await indexerClient.lookupAccountByID(walletAddress).do()
    const assets = accountInfo.account.assets

    // Check the total number of assets
    let totalAssets
    try {
      if (assets) {
        totalAssets = assets.length
      } else {
        totalAssets = 0
        return false
      }
    } catch (e) {
      console.log('error:', e)
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
      // auth token condition for user
      const userAuthTokenConditions =
        assetName === 'METAWORK-AUTH-TOKEN' &&
        assetSymbol === 'MAT' &&
        createdAddress === walletAddress &&
        clawbackAddress === metaWorkAddress &&
        decimals === 0 &&
        defaultFrozen === true &&
        amount === 1
      // auth token condition for admin
      const adminAuthTokenConditions =
        assetName === 'METAWORK_ADMIN_AUTH_TOKEN' &&
        assetSymbol === 'MAAT' &&
        createdAddress === admin_wallet_address &&
        clawbackAddress === metaWorkAddress &&
        decimals === 0 &&
        defaultFrozen === true &&
        amount === 1

      // If conditions are met return true
      if (userAuthTokenConditions) {
        return 'user'
      }
      if (adminAuthTokenConditions) {
        return 'admin'
      } else {
        notAuthToken++
        if (notAuthToken === totalAssets) {
          return false
        }
      }
    }
  } catch (e) {
    console.log(e)
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
        return assetId
      } else {
        notAuthToken++
        if (notAuthToken === totalAssets) {
          return false
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
