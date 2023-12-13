export default async function signTxn(walletClient, txn) {
  try {
    const signedTxn = await walletClient.signTransaction([txn])
    return signedTxn
  } catch (error) {
    console.log('COULDNOT SIGN TRANSACITON!', error)
    return error
  }
}
