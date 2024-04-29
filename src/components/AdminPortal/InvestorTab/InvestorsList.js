import { allUsersDetails } from '../../../backend/api'

export default async function InvestorsList() {
  // fetch the investors list from the api
  const allInvestors = (await allUsersDetails()).data.message

  // Filter out 'admin' users and keep only 'investor' users
  const investors = allInvestors.filter((investor) => investor.user_type === 'investor')

  const blockInvestorsData = investors.map((investor) => ({
    auth_id: investor.auth_id,
    block: investor.blocked,
  }))

  // Calculate the total investments and total withdrawals of all investors
  const totalInvestments = investors.reduce((acc, investor) => acc + investor.total_investments, 0)
  const currentInvestments = 0
  const totalYield = 0
  // Get the total number of investors
  const totalNumberOfInvestors = investors.length

  return {
    investors,
    blockInvestorsData,
    totalInvestments,
    currentInvestments,
    totalYield,
    totalNumberOfInvestors,
  }
}
