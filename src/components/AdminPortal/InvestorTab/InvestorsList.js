import { investorDetails } from '../../../backend/api'

export default async function InvestorsList() {
  // fetch the investors list from the api
  const allInvestors = await investorDetails().data.message

  // Filter out 'admin' users and keep only 'investor' users
  const investors = allInvestors.filter((investor) => investor.user_type === 'investor')

  // Separate 'investor' users into 'unblocked' and 'blocked' lists
  const unblockedInvestors = investors.filter((investor) => !investor.blocked)
  const blockedInvestors = investors.filter((investor) => investor.blocked)

  // Calculate the total investments and total withdrawals of all investors
  const totalInvestments = investors.reduce((acc, investor) => acc + investor.total_investments, 0)
  const totalWithdrawals = investors.reduce((acc, investor) => acc + investor.total_withdrawn, 0)

  // Get the total number of investors
  const totalNumberOfInvestors = investors.length

  return {
    investors,
    unblockedInvestors,
    blockedInvestors,
    totalInvestments,
    totalWithdrawals,
    totalNumberOfInvestors,
  }
}
