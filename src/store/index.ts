import { configureStore } from '@reduxjs/toolkit'
import { portofolioSlice } from './slice/portofolioSlice'
import { emailSlice } from './slice/emailSlice'

export const store = configureStore({
  reducer: {
    portofolio: portofolioSlice.reducer,
    email: emailSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch