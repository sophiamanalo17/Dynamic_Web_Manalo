//the toggle goes here because it is a UI state, not a data state. The data state is 
// the list of favourites, which is in the data slice. The UI state is whether or not 
// to filter by favourites, which is in the UI slice. I also think that now that there are 
// two filters& users can choose more than 1 thing to be true, it maakes sense to filter al
// l the blue slices by favorites. I combined the two filters  in Catalog.jsx into one filter, which is a
//  combination of the two. The color filter is still there, but now the favorite filter is
//  also there. The favorite filter is a boolean, so it can be true or false.

import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    colorFilter: 'all',
    favoriteFilter: false,
  },

  reducers: {
    filterChanged: (state, action) => {
        //assume the data you need coming in from the action payload
      state.colorFilter = action.payload;
    },
    favoriteFilterChanged: (state, action) => {
      state.favoriteFilter = action.payload;
    }
  },
});

export const { filterChanged, favoriteFilterChanged } = uiSlice.actions;
export default uiSlice.reducer;