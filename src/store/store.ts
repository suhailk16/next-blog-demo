import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
  dateCreated: null,
  email: null,
  id: null,
  name: null,
  imageUrl: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.dateCreated = action.payload.dateCreated
      state.email = action.payload.email
      state.id = action.payload.id
      state.name = action.payload.name
      state.imageUrl = action.payload.imageUrl
    },
    logout: (state) => {
      state = initialState
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('userId')
      return state
    },
  },
})

export const { login, logout } = authSlice.actions

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
})

export default store
