import axios from 'axios'
// const URL = 'https://devmetawork.securetool.company'
const URL = 'http://localhost:8000'

export const createUser = async (info) => {
  const data = JSON.stringify(info)
  const config = {
    method: 'post',
    url: `${URL}/user/create`,
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
        data: { message: 'Error creating user' },
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

export const userDetails = async (wallet_address) => {
  const config = {
    method: 'get',
    url: `${URL}/user?wallet_address=${wallet_address}`,
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

export const allUsersDetails = async () => {
  const config = {
    method: 'get',
    url: `${URL}/user/all`,
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

export const allInvestorsTotalYield = async () => {
  const config = {
    method: 'get',
    url: `${URL}/user/investors/yield`,
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
        data: { message: 'Error getting the total yield' },
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

export const loginUser = async (authId) => {
  const data = JSON.stringify({ auth_id: authId })
  const config = {
    method: 'patch',
    url: `${URL}/user/login`,
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
        data: { message: 'Error logging in user' },
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

export const changeNameUser = async (authId, name) => {
  const data = JSON.stringify({ auth_id: authId, name: name })
  const config = {
    method: 'patch',
    url: `${URL}/user/change_name`,
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
        data: { message: 'Error changing the user name' },
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

export const toggleUserStatus = async (info) => {
  const data = JSON.stringify(info)
  const config = {
    method: 'patch',
    url: `${URL}/user/block`,
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
        data: { message: 'Error changing the status for the user' },
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
