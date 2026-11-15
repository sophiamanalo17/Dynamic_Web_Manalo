import { configureStore } from '@reduxjs/toolkit'

import {
    artReducer,
    addArt,
    removeArt,
    changeSearchTerm
} from '../artSlice'

import {formReducer, changeName, changePrice} from '../formSlice'

export const store = configureStore({
  reducer: {
    art: artReducer,
    form: formReducer
  }
})

export {store, changeName, changePrice, addArt, removeArt, changeSearchTerm}