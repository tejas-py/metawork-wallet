import { createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState = {
  appLoading: false,
  appLoadingText: '',
  toasterState: {
    active: false,
    text: '',
    success: false,
  },
}

export const notifAndLoadingSlice = createSlice({
  name: 'NotifAndLoading',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleAppLoading: (state, action) => {
      state.appLoading = action.payload
    },
    setAppLoadingText: (state, action) => {
      state.appLoadingText = action.payload
    },
    setToaster: (state, action) => {
      state.toasterState.active = action.payload.active
      state.toasterState.text = action.payload.text
      state.toasterState.success = action.payload.success
    },
  },
})

export const { toggleAppLoading, setToaster, setAppLoadingText } = notifAndLoadingSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default notifAndLoadingSlice.reducer
