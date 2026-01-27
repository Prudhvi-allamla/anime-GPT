import { configureStore } from '@reduxjs/toolkit'
import userslice from './userslice'
import tmdbslice from './tmdbslice'

const appstore = configureStore({
  reducer: {
    user: userslice,

    tmdb: tmdbslice
  }

})
export default appstore