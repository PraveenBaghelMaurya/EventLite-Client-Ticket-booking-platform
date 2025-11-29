import { configureStore } from '@reduxjs/toolkit';
import { SignInSlice } from './feature/signInSlice'
import { eventSlice } from './feature/eventSlice'

export const store = configureStore({
  reducer: {
    signIn: SignInSlice.reducer,
    event: eventSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;