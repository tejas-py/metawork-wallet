import { investorDetails } from '../../backend/api.js'
import { loginInvestor } from '../../backend/api.js'

export default async function HandleAuthToken(walletAddress, navigate) {
  const result = await investorDetails(walletAddress)

  async function backendLogin() {
    const auth_id = result.data.message.auth_id
    await loginInvestor(auth_id)
  }

  if (result.success === true) {
    if (result.data.message.user_type === 'investor') {
      await backendLogin()
      navigate('/dashboard')
    }
    if (result.data.message.user_type === 'admin') {
      await backendLogin()
      navigate('/adminPortal')
    }
  }
  if (result.data.message === 'User not found') {
    navigate('/createAuthToken')
  }
}
