const algosdk = require('algosdk')

export async function algod() {
  const token = ''
  const server = 'https://testnet-api.algonode.cloud'
  const port = 443
  const algod = new algosdk.Algodv2(token, server, port)
  return algod
}

export async function indexer() {
  const token = ''
  const server = 'https://testnet-idx.algonode.cloud'
  const port = 443
  const indexerConnect = new algosdk.Indexer(token, server, port)
  return indexerConnect
}
