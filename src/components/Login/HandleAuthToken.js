import { checkAuthToken } from '../../blockchain/accounts.js'

export default async function HandleAuthToken(walletAddress, navigate) {
  const res = await checkAuthToken(walletAddress)

  if (res) {
    console.log('IM HIT TO GO TO DASHBOARD')
    navigate('/dashboard')
  }

  if (!res) {
    navigate('/createAuthToken')
  }
}
