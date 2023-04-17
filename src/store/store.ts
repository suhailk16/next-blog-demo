import { configureStore, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    dateCreated: null,
    email: null,
    id: null,
    name: null,
    imageUrl: null,
  },
  reducers: {
    login: (state, action) => {
      state.dateCreated = action.payload.dateCreated
      state.email = action.payload.email
      state.id = action.payload.id
      state.name = action.payload.name
      state.imageUrl = action.payload.imageUrl
    },
  },
})

export const { login } = authSlice.actions

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
})

export default store
