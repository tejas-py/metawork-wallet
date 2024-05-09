import { PublicKey } from '@solana/web3.js'

export function validateAddress(address) {
  try {
    new PublicKey(address)
    return true
  } catch (error) {
    return false
  }
}
