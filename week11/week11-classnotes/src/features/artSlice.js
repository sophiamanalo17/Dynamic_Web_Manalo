import { createSlice, nanoid } from '@reduxjs/toolkit'

const artSlice = createSlice({
  name: 'art',

  initialState: {
    data: [],
    searchTerm: ''
  },
  reducers: {
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },

    //a slice CANNOT see another slice's state the name and proce
    //live in form slice, and there is no way to reach them from here
    //so the componet reads them and sends them in action.payload
    //assume action.payload us {nameL 'modrian, comp 1, price: 500}
    //but what abt the unique ID
    //we generate it here using nanoid from Redux Toolkit
    addArt: (state, action) => {
      state.data.push({
        id: nanoid(), 
        name: action.payload.name, 
        price: action.payload.price})
    },

    //here we assume we receive the id of the item totdelete via action.payload
    removeArt: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload)
    }
  }
})

export const { changeSearchTerm, addArt, removeArt } = artSlice.actions
export default artSlice.reducer