import { userDetails } from '../../backend/api.js'
import { loginUser } from '../../backend/api.js'

export default async function HandleAuthToken(walletAddress, navigate) {
  const result = await userDetails(walletAddress)

  async function backendLogin() {
    const auth_id = result.data.message.auth_id
    await loginUser(auth_id)
  }

  if (result.success === true) {
    if (result.data.message.user_type === 'investor') {
      await backendLogin()
      navigate('/investors/dashboard')
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
