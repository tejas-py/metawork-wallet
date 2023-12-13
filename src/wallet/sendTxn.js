import { algod } from '../blockchain/algodClient'

export default async function sendTxn(signedTxn) {
  try {
    const algodClient = await algod()
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do()
    return txId
  } catch (e) {
    console.log("Coudn't send txn!", e)
  }
}
