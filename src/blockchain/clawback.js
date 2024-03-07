import { algod } from '../blockchain/algodClient'
const algosdk = require('algosdk')

export default async function assetClawback(auth_id, from_address, to_address) {
  const algodClient = await algod()
  const suggestedParams = await algodClient.getTransactionParams().do()
  const metaWorkAddress = 'IXQXUPYYLCQIOYSVNLGKVC7PANRHLHKOML5HACB6EM7GM4GM4S6ZTEFECY'

  const note = { message: 'Clawback by SECURE MetaWork' }
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    metaWorkAddress,
    to_address,
    undefined,
    from_address,
    1,
    algosdk.encodeObj(note),
    auth_id,
    suggestedParams
  )
  return [{ txn, signers: [metaWorkAddress] }]
}
