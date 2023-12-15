import { checkAuthToken } from '../../blockchain/accounts.js'

export default async function HandleAuthToken(walletAddress, navigate) {
  const res = await checkAuthToken(walletAddress)

  if (res) {
    navigate('/dashboard')
  }

  if (!res) {
    navigate('/createAuthToken')
  }
}
