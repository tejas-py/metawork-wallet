import { checkAuthToken } from '../../blockchain/accounts.js'

export default async function HandleAuthToken(walletAddress, navigate) {
  const res = await checkAuthToken(walletAddress)

  if (res === 'user') {
    navigate('/dashboard')
  }
  if (res === 'admin') {
    navigate('/adminPortal')
  } else {
    navigate('/createAuthToken')
  }
}
