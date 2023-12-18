import { algod, indexer } from '../blockchain/algodClient'
import msgPack from '@ygoe/msgpack'
const algosdk = require('algosdk')

export async function create(walletAddress) {
  const algodClient = await algod()
  const suggestedParams = await algodClient.getTransactionParams().do()

  const note = {
    name: 'METAWORK_AUTH_TOKEN',
    description: 'Auth token of the user for the metawork portal',
    type: 'auth-token',
    property: {
      holding_wallet: '',
      assets: {
        'Genopets': [
          {
            tradeType: 'buy',
            pricePerAsset: 50.0,
            timeStamp: '12/12/2012 12:25:12',
            units: 10.0,
          },
          {
            tradeType: 'buy',
            pricePerAsset: 0.01,
            timeStamp: '12/12/2022 12:12:22',
            units: 100,
          },
        ],
        'Synesis One': [
          {
            tradeType: 'buy',
            pricePerAsset: 50.0,
            timeStamp: '12/12/2012 12:25:12',
            units: 10.0,
          },
          {
            tradeType: 'sell',
            pricePerAsset: 25.0,
            timeStamp: '12/12/2012 12:24:12',
            units: 20.0,
          },
          {
            tradeType: 'sell',
            pricePerAsset: 20.0,
            timeStamp: '12/12/2012 12:23:12',
            units: 55.0,
          },
          {
            tradeType: 'sell',
            pricePerAsset: 20.0,
            timeStamp: '12/12/2012 12:22:12',
            units: 20.0,
          },
          {
            tradeType: 'buy',
            pricePerAsset: 12.0,
            timeStamp: '12/12/2012 12:21:12',
            units: 5.0,
          },
          {
            tradeType: 'sell',
            pricePerAsset: 15.0,
            timeStamp: '12/12/2012 12:20:12',
            units: 10.0,
          },
          {
            tradeType: 'buy',
            pricePerAsset: 10.0,
            timeStamp: '11/12/2012 12:12:22',
            units: 100.0,
          },
        ],
      },
    },
  }
  const metaWorkAddress = 'IXQXUPYYLCQIOYSVNLGKVC7PANRHLHKOML5HACB6EM7GM4GM4S6ZTEFECY'
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    walletAddress,
    algosdk.encodeObj(note),
    1,
    0,
    true,
    metaWorkAddress,
    metaWorkAddress,
    metaWorkAddress,
    metaWorkAddress,
    'MAT',
    'METAWORK-AUTH-TOKEN',
    'metawork.securetool.company',
    undefined,
    suggestedParams,
    undefined
  )
  return [{ txn, signers: [walletAddress] }]
}

export async function authTokenDetails(assetId) {
  const indexerClient = await indexer()
  const res = await indexerClient.lookupAssetTransactions(assetId).do()
  const decodedString = msgPack.deserialize(Buffer.from(res['transactions'][0]['note'], 'base64'))
  return decodedString
}
