import { algod } from '../blockchain/algodClient'
const algosdk = require('algosdk')

export default async function sendTxn(signedTxn) {
  try {
    const algodClient = await algod()
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do()
    await algosdk.waitForConfirmation(algodClient, txId, 3)
    return txId
  } catch (e) {
    console.log("Coudn't send txn!", e)
  }
}
