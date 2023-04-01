import { createSlice } from '@reduxjs/toolkit'

export const stateSlice = createSlice({
  name: 'auth',
  initialState: {
    userID: null,
    isAdmin: true,
    isLoggedIn: true
  },
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserID, setAdmin, setLoggedIn } = stateSlice.actions

export default stateSlice.reducer