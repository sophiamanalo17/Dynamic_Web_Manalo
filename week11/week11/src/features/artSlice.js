//questions about sorting
//1. Sort order: it is state, because it depends on whether the user clicked the sort button,
// and nothing else in the store can tell us that, so Redux has to remember it (sorte)
//2. Sorted array: it is not state, because its calculated from selectVisibleArt selector from data and sort, so storing it would be 
// like having a second copy

import {createSlice, createSelector, nanoid} from '@reduxjs/toolkit'

const artSlice = createSlice({
  name: 'art',

  initialState: {
    searchTerm: '',
    sorte: false,
    data: [],
  },

  reducers: {
    // assumption ever reducer makes :
    // whatever we want to change the value TO is arriving as action.payload
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload
    },

    addArt(state, action) {
      // A SLICE CANNOT SEE ANOTHER SLICE'S STATE! 
      state.data.push({
        id: nanoid(),
        name: action.payload.name,
        price: action.payload.price,
      })
    },

    // here we assume we receive the id of the item to delete via action.payload
    removeArt(state, action) {
      console.log(action.payload)
      // remember that state here is just state.data, once out of this file its state.art.data
      state.data = state.data.filter((item) => item.id !== action.payload)
    },

    filterArt(state, action) {
      state.sorte = action.payload
    },

    // empties the whole collection. no payload needed, there is nothing to tell it
    // the "are you sure?" step is NOT here, it lives in the ClearCollection component
    clearCollection(state) {
      state.data = []
    },
  },
})

export const {changeSearchTerm, addArt, removeArt, filterArt, clearCollection} =
  artSlice.actions

// Selectors live next to the slice that owns the data, Both of these answer a question about the art
// so this is where they belong, and it is the only file that knows the shape of state.art
// export const selectVisibleArt = (state) =>
//   state.art.data.filter((art) =>
//     art.name.toLowerCase().includes(state.art.searchTerm.toLowerCase())
//   )

export const selectVisibleArt = createSelector(
  // select and destructure out data, searchTerm
  [
    (state) => state.art.data,
    (state) => state.art.searchTerm,
    (state) => state.art.sorte,
  ],

  (data, searchTerm, sorte) => {
    // filter first (this makes a NEW array, so sorting it below is safe)
    const filtered = data.filter((art) =>
      art.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // if sorting is off, give back the list in the order it was added
    if (!sorte) {
      return filtered
    }

    // b - a puts the bigger price first (highest to lowest)
    return filtered.sort((a, b) => b.price - a.price)
  }
)

// export const selectTotalValue = (state) =>
//   selectVisibleArt(state).reduce((running, art) => running + art.price, 0)

export const selectTotalValue = createSelector([selectVisibleArt], (visible) =>
  visible.reduce((running, art) => running + art.price, 0)
)

export const selectTotalNumber = createSelector([selectVisibleArt], (visible) => visible.length)

export const artReducer = artSlice.reducer
