import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    price: 0
  },
  //assumption every reducer makes = whatever we want to change the value to is arriving
  //as ______.action.payload
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload
    },
    changePrice: (state, action) => {
      state.price = action.payload
    },
  }
})

export const { changeName, changePrice } = formSlice.actions
export default formSlice.reducer