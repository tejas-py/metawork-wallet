import axios from 'axios'
const URL = 'https://price.jup.ag/v4'

export const getAssetPrice = async (asset1, asset2) => {
  const config = {
    method: 'get',
    url: `${URL}/price?ids=${asset1}&vsToken=${asset2}`,
  }

  try {
    const res = await axios(config)
    if (res.status === 200) {
      let returnRes = {
        success: true,
        data: res,
      }

      return returnRes
    } else {
      let returnRes = {
        success: false,
        data: { message: 'Error getting GENE price' },
      }
      return returnRes
    }
  } catch (err) {
    let returnRes = {
      success: false,
      data: err.response ? err.response.data : { message: 'Error: Network Error' },
    }
    return returnRes
  }
}
