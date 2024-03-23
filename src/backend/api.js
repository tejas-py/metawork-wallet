import axios from 'axios'
const URL = 'https://devmetawork.securetool.company'

export const createInvestor = async (info) => {
  const data = JSON.stringify(info)
  const config = {
    method: 'post',
    url: `${URL}/user/investor/create/`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  }

  try {
    const res = await axios(config)
    if (res.status === 200) {
      let returnRes = {
        success: true,
        data: res.data,
      }

      return returnRes
    } else {
      let returnRes = {
        success: false,
        data: { message: 'Error creating investor' },
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

export const investorDetails = async (wallet_address) => {
  const config = {
    method: 'get',
    url: `${URL}/user/investor/?wallet_address=${wallet_address}`,
  }

  try {
    const res = await axios(config)
    if (res.status === 200) {
      let returnRes = {
        success: true,
        data: res.data,
      }

      return returnRes
    } else {
      let returnRes = {
        success: false,
        data: { message: 'Error checking auth token' },
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

export const allInvestorsDetails = async () => {
  const config = {
    method: 'get',
    url: `${URL}/user/investors/`,
  }

  try {
    const res = await axios(config)
    if (res.status === 200) {
      let returnRes = {
        success: true,
        data: res.data,
      }

      return returnRes
    } else {
      let returnRes = {
        success: false,
        data: { message: 'Error checking auth token' },
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

export const allInvestorsTradeHistory = async () => {
  const config = {
    method: 'get',
    url: `${URL}/user/investors/trade_history`,
  }

  try {
    const res = await axios(config)
    if (res.status === 200) {
      let returnRes = {
        success: true,
        data: res.data,
      }

      return returnRes
    } else {
      let returnRes = {
        success: false,
        data: { message: 'Error getting the Trade History' },
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

export const loginInvestor = async (authId) => {
  const data = JSON.stringify({ auth_id: authId })
  const config = {
    method: 'patch',
    url: `${URL}/user/investor/login/`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  }

  try {
    const res = await axios(config)
    if (res.status === 200) {
      let returnRes = {
        success: true,
        data: res.data,
      }

      return returnRes
    } else {
      let returnRes = {
        success: false,
        data: { message: 'Error creating investor' },
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

export const changeNameInvestor = async (authId, name) => {
  const data = JSON.stringify({ auth_id: authId, name: name })
  const config = {
    method: 'patch',
    url: `${URL}/user/investor/change_name/`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  }

  try {
    const res = await axios(config)
    if (res.status === 200) {
      let returnRes = {
        success: true,
        data: res.data,
      }

      return returnRes
    } else {
      let returnRes = {
        success: false,
        data: { message: 'Error creating investor' },
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

export const toggleInvestorStatus = async (info) => {
  const data = JSON.stringify(info)
  const config = {
    method: 'patch',
    url: `${URL}/user/investor/block/`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  }

  try {
    const res = await axios(config)
    if (res.status === 200) {
      let returnRes = {
        success: true,
        data: res.data,
      }

      return returnRes
    } else {
      let returnRes = {
        success: false,
        data: { message: 'Error creating investor' },
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
