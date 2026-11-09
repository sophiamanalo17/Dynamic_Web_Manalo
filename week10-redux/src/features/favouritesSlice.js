//from the plugin
// action: cart/quantityIncreased
//diff: the qunatity changed from 1 to 2

import {createSlice} from '@reduxjs/toolkit'

const favouritesSlice = createSlice({
  name: 'favourites',

  initialState: {
    ids: [],
  },

  reducers: {
    favouriteToggled(state, action) {
      const id = action.payload

      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((favouriteId) => favouriteId !== id)
        return
      }

      state.ids.push(id)
    },
  },
})

export const {favouriteToggled} = favouritesSlice.actions

export const selectFavouriteIds = (state) => state.favourites.ids
export const selectFavouriteCount = (state) => state.favourites.ids.length

export default favouritesSlice.reducer
