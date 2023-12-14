import { create } from '../../blockchain/authToken.js'
import signTxn from '../../wallet/signTxn.js'
import sendTxn from '../../wallet/sendTxn.js'

export default async function MintMyNFT(walletClient, walletAddress) {
  const txn = await create(walletAddress)
  const signedTxn = await signTxn(walletClient, txn)
  const txId = await sendTxn(signedTxn)
  return txId
}
