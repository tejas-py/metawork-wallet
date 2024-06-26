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
      dividend_wallet: '',
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
