import {createSlice} from '@reduxjs/toolkit'
import {addArt} from './artSlice'


const formSlice = createSlice({
  name: 'form',

  initialState: {
    name: '',
    price: 0,
  },

  reducers: {
    changeName(state, action) {
      state.name = action.payload
    },

    changePrice(state, action) {
      state.price = action.payload
    },
  },

  /* extraReducers is how a slice responds to an action it does not own.
     addArt belongs to artSlice. We are not calling it, intercepting it,
     or changing what it does: we are saying "when that happens, here is
     what the form should do about it". Both reducers run, on their own
     branch of the state, from the one dispatch. */
  extraReducers(builder) {
    builder.addCase(addArt, (state) => {
      // no action parameter: there is nothing in the payload we need
      state.name = ''
      state.price = 0
    })
  },
})


export const {changeName, changePrice} = formSlice.actions

export const formReducer = formSlice.reducer
